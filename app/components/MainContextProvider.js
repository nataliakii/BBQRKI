"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { sendWaiter, sendBill, sendShisha } from "@common/BotRequest";
import { useMediaQuery } from "@mui/material";
import {
  getLongLanguageName,
  handleButtonSpecificLogic,
  findPreferredLanguage,
} from "@common/index";
import useGeo from "@common/useGeo";
import useHighSeason from "@common/useHighSeason";
import { I18nextProvider } from "react-i18next";
import i from "@locales/i18n";
import { getNetworkInfo } from "@utils/functions";
import { getChatIdForTable } from "@common/getChatIdForTable";

const MainContext = createContext();

export function useMainContext() {
  return useContext(MainContext);
}

export const MainContextProvider = ({
  children,
  rest,
  umbrella,
  r,
  dev,
  menuOnly,
}) => {
  const [onlyMenuFromParams, setOnlyMenu] = useState(menuOnly);
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  useEffect(() => {
    const selectedLanguage = findPreferredLanguage();
    setLang(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  }, [i18n, setLang]);

  const [headerRef, setHeaderRef] = useState(null);

  const [devel, setDev] = useState(dev);

  const [restData, setRest] = useState(rest);
  const isHighSeason = useHighSeason(rest);
  const countTimer = rest.buttonTimer || 10;

  const [isWorkingTime, setIsWorkingTime] = useState(true);
  const [zont, setZont] = useState(umbrella);
  const history = typeof window !== "undefined" ? window?.history : null;

  useEffect(() => {
    if (zont) {
      setShowInitialHeader(true);
      const timeoutId = setTimeout(() => {
        history.replaceState({}, document.title, window.location.pathname);
      }, 5 * 60 * 1000);

      return () => clearTimeout(timeoutId);
    } else {
      setShowInitialHeader(false);
      setShowScan(true);
    }
  }, [zont, history]);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isVerySmallScreen = useMediaQuery((theme) =>
    theme.breakpoints.down("xs")
  );

  const [showInitialHeader, setShowInitialHeader] = useState(false);
  const [showInside, setShowInside] = useState(false);
  const [showScan, setShowScan] = useState(false);

  const [countdownWaiter, setCountdownWaiter] = useState(0);
  const [countdownBill, setCountdownBill] = useState(0);
  // Function to introduce a delay for proper upload of Geolocation
  const ms = 1900;
  const delay = () => new Promise((resolve) => setTimeout(resolve, ms));

  const [isWaiterButtonActive, setWaiterButtonActive] = useState(true);
  const [isButtonBillActive, setButtonBillActive] = useState(true);

  const language = getLongLanguageName(lang);
  const messageRun = t("alert.run");
  const messageOops = t("alert.oops");
  const messageGot = t("alert.got");
  const messageInside = t("alert.inside");
  const messageElse = t("alert.else");
  const messageEnable = t("alert.enableLoc");
  const {
    isGeolocationAvailable,
    currentPosition,
    updateGeolocation,
    radius,
    setRadius,
  } = useGeo(r, rest, zont, isHighSeason);

  const messageWaiter1 = `${rest.name}.Table ${zont} called the Waiter.  Language - ${language}.\nΤραπέζι ${zont} κάλεσε τον σερβιτόρο. Γλώσσα - ${language}.`;
  let messageBill1 = `${rest.name}. Table ${zont} asks for Bill. Language - ${language}.\nΤραπέζι ${zont} ζητά τον λογαριασμό.  Γλώσσα - ${language}. `;
  const messageShisha = `${rest.name}.Table ${zont} called Shisha.  Language - ${language}.\nΤραπέζι ${zont} κάλεσε τον shisha. Γλώσσα - ${language}.`;

  const [modalVisible, setModalVisible] = useState(false);
  const [loadingModal, setLoading] = useState(true);
  const [modalContent, setModalContent] = useState("");
  const [run, setRun] = useState(false);
  const showModal = (
    content = "sending your message...",
    loading = true,
    run = false
  ) => {
    setModalVisible(true);
    setModalContent(content);
    if (loading) {
      setLoading(true);
    } else setLoading(false);
    if (run) {
      setRun(true);
    }
  };

  const hideModal = () => {
    setLoading(false);
    setModalVisible(false);
  };
  const confirmAction = (message) => {
    const confirmed = window.confirm(message);
    if (confirmed) {
      return true;
    }
    return false;
  };

  const performActionBill = async (action) => {
    try {
      handleButtonSpecificLogic(
        setButtonBillActive,
        setCountdownBill,
        countTimer,
        "Bill"
      );
      await action();
      hideModal();
      showModal();
    } catch (error) {
      alert(
        `${messageOops}.Error in performActionBill: ${JSON.stringify(error)}`
      );
    }
  };
  const performActionWaiter = async (action) => {
    try {
      handleButtonSpecificLogic(
        setWaiterButtonActive,
        setCountdownWaiter,
        countTimer,
        "Waiter"
      );
      await action();
      hideModal();
      showModal();
    } catch (error) {
      showModal(
        `${messageOops}.Error in performActionWaiter: ${JSON.stringify(error)}`,
        false,
        true
      );
    }
  };
  const performActionShisha = async (action) => {
    try {
      handleButtonSpecificLogic(
        setWaiterButtonActive,
        setCountdownWaiter,
        countTimer,
        "Shisha"
      );
      await action();
      hideModal();
      showModal();
    } catch (error) {
      showModal(
        `${messageOops}.Error in performActionShisha: ${JSON.stringify(error)}`,
        false,
        true
      );
    }
  };
  const handleCallWaiter = async () => {
    let chatNumber;
    if (!isGeolocationAvailable) {
      updateGeolocation();
      await delay();
    }
    const message = messageWaiter1;

    if (isGeolocationAvailable) {
      if (isWaiterButtonActive) {
        if (!isButtonBillActive && !confirmAction(messageElse)) {
          return;
        }
        if (
          currentPosition.distanceToRest <=
          Number(radius) + currentPosition.accuracy
        ) {
          chatNumber = getChatIdForTable(rest, zont);

          performActionWaiter(() => {
            sendWaiter(
              message,
              restData.backendEndpoints.waiter,
              chatNumber,
              (responseData) => {
                // Success callback
                showModal(messageGot, false, true);
                setShowInitialHeader(false);
                setShowInside(false);
                setShowScan(true);
              },
              (error) => {
                // Error callback
                console.error(error);
                showModal(messageOops);
                setShowInitialHeader(false);
                setShowInside(false);
                setShowScan(true);
              }
            );
          });
        } else {
          updateGeolocation();
          showModal(`${messageInside}`, false, false);
          setTimeout(function () {
            hideModal();
          }, 30000);
          history?.replaceState({}, document.title, window?.location.pathname);
          // router?.replace(router.asPath, undefined, { shallow: true });
          setShowInitialHeader(false);
          setShowScan(false);
          setShowInside(true);
        }
      } else {
        showModal(messageRun, false, true);
        setTimeout(function () {
          hideModal(); // Call hideModal function after 10 seconds
        }, 10000); // 10 seconds in milliseconds
      }
    } else {
      updateGeolocation();
      // Handle case where geolocation was rejected
      showModal(messageEnable, false, false);
    }
  };

  const handleCallShisha = async () => {
    if (!isGeolocationAvailable) {
      updateGeolocation();
      await delay();
    }

    const getChatIds = (tableMap) => {
      console.log(tableMap);
      return tableMap?.map((item) => item.chatId);
    };

    const chats = getChatIds(restData?.waiterTableMap);
    console.log(chats);
    console.log(restData);
    const chats_id = ["-4098065128", "-1002123939465"];

    if (isGeolocationAvailable) {
      if (
        currentPosition.distanceToRest <=
        Number(radius) + currentPosition.accuracy
      ) {
        performActionShisha(() => {
          sendShisha(
            messageShisha,
            restData.backendEndpoints?.shisha || "/shisha",
            chats_id,
            (responseData) => {
              // Success callback
              showModal(messageGot, false, true);
              setShowInitialHeader(false);
              setShowInside(false);
              setShowScan(true);
            },
            (error) => {
              // Error callback
              console.error(error);
              showModal(messageOops);
              setShowInitialHeader(false);
              setShowInside(false);
              setShowScan(true);
            }
          );
        });
      } else {
        updateGeolocation();
        showModal(`${messageInside}`, false, false);
        setTimeout(function () {
          hideModal();
        }, 30000);
        history?.replaceState({}, document.title, window?.location.pathname);
        // router?.replace(router.asPath, undefined, { shallow: true });
        setShowInitialHeader(false);
        setShowScan(false);
        setShowInside(true);
      }
    } else {
      showModal(messageRun, false, true);
      setTimeout(function () {
        hideModal(); // Call hideModal function after 10 seconds
      }, 10000); // 10 seconds in milliseconds
    }
  };

  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethod, onPaymentMethodSelect] = useState(null);

  const handleCallBill = async () => {
    let chatNumber;
    await delay();
    if (isGeolocationAvailable) {
      if (
        currentPosition.distanceToRest <=
        Number(radius) + currentPosition.accuracy
      ) {
        const paymentWithCash = window.confirm(t("bill.payment"));
        // setPaymentModalOpen(true);

        //Determine the payment method based on the user's choice
        const paymentMethod = paymentWithCash ? "Cash" : "Card";
        //Include the payment method in the message
        messageBill1 = `${rest.name}.Table ${zont} asks for Bill. Payment Method: ${paymentMethod}. Language - ${language}.\nΤραπέζι ${zont} ζητά τον λογαριασμό. Τρόπος Πληρωμής:${paymentMethod}. Γλώσσα - ${language}.`;
        chatNumber = getChatIdForTable(rest, zont);
        console.log("chatNumber", chatNumber);
        performActionBill(() => {
          sendBill(
            messageBill1,
            restData.backendEndpoints.waiter,
            chatNumber,
            (responseData) => {
              // Success callback
              showModal(messageGot, false, true);
              setShowInitialHeader(false);
              setShowScan(true);
            },
            (error) => {
              // Error callback
              showModal(messageOops);
              setShowInitialHeader(false);
              setShowScan(true);
            }
          );
        });
      } else {
        updateGeolocation();
        showModal(`${messageInside}`, false, false);
        history?.replaceState({}, document.title, window.location.pathname);
        // router?.replace(router?.asPath, undefined, { shallow: true });
        setShowInitialHeader(false);
        setShowScan(false);
        setShowInside(true);
      }
    } else {
      updateGeolocation();
      // Handle case where geolocation was rejected
      showModal(messageEnable, false, false);
    }
  };
  // Periodically update the Waiter countdown timer using setInterval
  // useEffect(() => {
  //   const waiterInterval = setInterval(() => {
  //     // Update countdown of Waiter button
  //     setCountdownWaiter((prevCountdown) => {
  //       if (prevCountdown === 0) {
  //         // Countdown finished
  //         clearInterval(waiterInterval); // Stop the interval
  //         setWaiterButtonActive(true);
  //         return 0;
  //       } else {
  //         return prevCountdown - 1;
  //       }
  //     });
  //   }, 1000); // 1 second interval

  //   return () => clearInterval(waiterInterval); // Cleanup when the component unmounts
  // }, [isWaiterButtonActive]);
  // Periodically update the Bill countdown timer using setInterval
  // useEffect(() => {
  //   const billInterval = setInterval(() => {
  //     // Update countdown of Waiter button
  //     setCountdownBill((prevCountdown) => {
  //       if (prevCountdown === 0) {
  //         // Countdown finished
  //         clearInterval(billInterval); // Stop the interval
  //         setButtonBillActive(true);
  //         return 0;
  //       } else {
  //         return prevCountdown - 1;
  //       }
  //     });
  //   }, 1000); // 1 second interval

  //   return () => clearInterval(billInterval); // Cleanup when the component unmounts
  // }, [isButtonBillActive]);

  // // Load countdown start time and button state from localStorage on component mount
  // useEffect(() => {
  //   const savedStartTimeWaiter = parseInt(
  //     localStorage.getItem("StartTimeWaiter"),
  //     10
  //   );
  //   const savedIsWaiterButtonActive = JSON.parse(
  //     localStorage.getItem("isWaiterButtonActive")
  //   );

  //   if (!isNaN(savedStartTimeWaiter) && savedIsWaiterButtonActive !== null) {
  //     const currentTime = Math.floor(new Date().getTime() / 1000);
  //     const elapsedSeconds = currentTime - savedStartTimeWaiter;

  //     if (elapsedSeconds >= countTimer) {
  //       // Timer has expired, set button as active
  //       setWaiterButtonActive(true);
  //       setCountdownWaiter(0);
  //       localStorage.removeItem("StartTimeWaiter");
  //     } else {
  //       // Timer still active, set button as inactive
  //       setWaiterButtonActive(false);
  //       setCountdownWaiter(countTimer - elapsedSeconds);
  //     }
  //   }
  // }, [countTimer]);
  // useEffect(() => {
  //   const savedStartTimeBill = parseInt(
  //     localStorage.getItem("StartTimeBill"),
  //     10
  //   );
  //   const savedButtonBillActive = JSON.parse(
  //     localStorage.getItem("isButtonBillActive")
  //   );

  //   if (!isNaN(savedStartTimeBill) && savedButtonBillActive !== null) {
  //     const currentTime = Math.floor(new Date().getTime() / 1000);
  //     const elapsedSeconds = currentTime - savedStartTimeBill;

  //     if (elapsedSeconds >= countTimer) {
  //       // Timer has expired, set button as active
  //       setButtonBillActive(true);
  //       setCountdownBill(0);
  //       localStorage.removeItem("StartTimeBill");
  //     } else {
  //       // Timer still active, set button as inactive
  //       setButtonBillActive(false);
  //       setCountdownBill(countTimer - elapsedSeconds);
  //     }
  //   }
  // }, [countTimer]);

  const contextValue = {
    countdownWaiter,
    countdownBill,
    isWaiterButtonActive,
    isButtonBillActive,
    setCountdownWaiter,
    setButtonBillActive,
    handleCallWaiter,
    handleCallBill,
    zont,
    setZont,
    lang,
    setLang,
    isSmallScreen,
    showInitialHeader,
    setRadius,
    radius,
    currentPosition,
    modalVisible,
    loadingModal,
    modalContent,
    hideModal,
    run,
    restData,
    setRest,
    setHeaderRef,
    headerRef,
    devel,
    isVerySmallScreen,
    showScan,
    showInside,
    messageInside,
    isWorkingTime,
    onlyMenuFromParams,
    isPaymentModalOpen,
    setPaymentModalOpen,
    onPaymentMethodSelect,
    handleCallShisha,
  };

  return (
    <I18nextProvider i18n={i}>
      <MainContext.Provider value={contextValue}>
        {children}
      </MainContext.Provider>{" "}
    </I18nextProvider>
  );
};
