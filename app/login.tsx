import { TextInput } from "@/components/TextInput";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useAuth } from "@/context/AuthContext";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { authService } from "./services";

type FormValues = {
  email: string;
  password: string;
};

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const Page = () => {
  const [countryCode, setCountryCode] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const router = useRouter();
  const { signIn } = useSignIn();
  const { onLogin } = useAuth();

  const { mutateAsync } = useMutation({ mutationFn: authService.login });

  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;

        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
        });
        const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
          return factor.strategy === "phone_code";
        });

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });

        router.push({
          pathname: "/verify/[phone]",
          params: { phone: fullPhoneNumber, signin: "true" },
        });
      } catch (err) {
        console.log("error", JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err)) {
          if (err.errors[0].code === "form_identifier_not_found") {
            Alert.alert("Error", err.errors[0].message);
          }
        }
      }
    }
  };

  const { ...methods } = useForm({ mode: "onChange" });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("FORM DATA", data);
    try {
      const res = await onLogin(data.email, data.password);
      console.log("LOGIN RESPONSE🚀", res);
    } catch (error: any) {
      console.log("ERROR LOGIN RESPONSE🚀", error.response.data.message);
      methods.setError("password", error.response.data.message, { shouldFocus: true });
    }
  };

  const [formError, setError] = useState<Boolean>(false);

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log({ errors });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
      {formError ? (
        <View>
          <Text style={{ color: "red" }}>There was a problem with loading the form. Please try again later.</Text>
        </View>
      ) : (
        <View style={defaultStyles.container}>
          <Text style={defaultStyles.header}>Welcome back</Text>
          <Text style={defaultStyles.descriptionText}>Enter the credentials associated with your account</Text>
          <View style={styles.inputContainer}>
            <FormProvider {...methods}>
              <TextInput
                name='email'
                style={styles.input}
                label='Email'
                placeholder='jon.doe@email.com'
                keyboardType='email-address'
                rules={{
                  required: "Email is required!",
                  pattern: {
                    value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
                    message: "Must be formatted: john.doe@email.com",
                  },
                }}
                setFormError={setError}
              />
              <TextInput
                style={[styles.input]}
                name='password'
                label='Password'
                secureTextEntry
                placeholder='**********'
                rules={{ required: "Password is required!" }}
                setFormError={setError}
              />
            </FormProvider>
          </View>

          <TouchableOpacity
            style={[defaultStyles.pillButton, phoneNumber !== "" ? styles.enabled : styles.disabled, { marginBottom: 20 }]}
            onPress={methods.handleSubmit(onSubmit, onError)}
          >
            <Text style={defaultStyles.buttonText}>Continue</Text>
          </TouchableOpacity>

          {/*
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
            }}
          />
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
            }}
          />
        </View>

         <TouchableOpacity
          onPress={() => onSignIn(SignInType.Email)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons name='mail' size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>Continue with email </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Google)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons name='logo-google' size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>Continue with email </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Apple)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons name='logo-apple' size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>Continue with email </Text>
        </TouchableOpacity> */}
        </View>
      )}
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "column",
    gap: 20,
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
export default Page;
