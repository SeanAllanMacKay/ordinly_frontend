import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Screen, Typography } from "@/components";
import { useGetCurrentUserQuery, useVerifyAccountMutation } from "@/api";
import { verifyAccountScreenStyles } from "./styles";
import { VerifyAccountScreenProps } from "./types";

export const VerifyAccountScreen = ({
  code,
  onRedirect,
}: VerifyAccountScreenProps) => {
  const { t } = useTranslation("auth");
  const [timer, setTimer] = useState(5);

  const userQuery = useGetCurrentUserQuery();
  const verifyAccountMutation = useVerifyAccountMutation();

  useEffect(() => {
    if (
      code &&
      !(
        verifyAccountMutation.isPending ||
        verifyAccountMutation.isSuccess ||
        verifyAccountMutation.isError
      )
    ) {
      verifyAccountMutation.mutate({ code });
    }
  }, [verifyAccountMutation, code]);

  useMemo(() => {
    if (verifyAccountMutation?.isSuccess) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(interval);
          }

          return prevTimer - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [verifyAccountMutation?.isSuccess]);

  useEffect(() => {
    if (timer === 0) {
      // Signed-in users go home; logged-out users go to login.
      onRedirect(!!userQuery.data?.user);
    }
  }, [timer]);

  return (
    <Screen>
      <View style={verifyAccountScreenStyles.container}>
        {verifyAccountMutation.isSuccess ? (
          <>
            <Typography>{t("verifyAccount.verified")}</Typography>

            <Typography>
              {t("verifyAccount.redirecting", { count: timer })}
            </Typography>
          </>
        ) : verifyAccountMutation?.isError ? (
          <Typography>{t("verifyAccount.error")}</Typography>
        ) : (
          <Typography>{t("verifyAccount.verifying")}</Typography>
        )}
      </View>
    </Screen>
  );
};
