import React, { useEffect, useMemo, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Screen } from "@/components";
import { useVerifyAccountMutation } from "@/api";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

export const VerifyAccountScreen = () => {
  const [timer, setTimer] = useState(5);
  const navigation = useNavigation();
  const router = useRouter();

  const { code } = useLocalSearchParams<{ code: string }>();

  const verifyAccountMutation = useVerifyAccountMutation();

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Verify account" });
  }, [navigation]);

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
      router.replace("/login");
    }
  }, [timer]);

  return (
    <Screen>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {verifyAccountMutation.isSuccess ? (
          <>
            <Text>Account verified</Text>

            <Text>Redirecting in {timer} seconds...</Text>
          </>
        ) : verifyAccountMutation?.isError ? (
          <Text>Error verifying account</Text>
        ) : (
          <Text>Verifying account...</Text>
        )}
      </View>
    </Screen>
  );
};
