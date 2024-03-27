import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
  Button,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function Home() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const onSubmit = (data) => console.log(data);
  return (
    <View className=" bg-white">
      <ImageBackground
        className="h-full w-full flex items-center justify-center"
        source={require("../../../assets/bg-login.webp")}
      >
        <View className="w-5/6 rounded-md p-10 bg-white/90 shadow-orange-400 ">
          <View className="flex flex-row justify-center  items-center w-full">
            <Text className="font-semibold text-5xl p-4">PlanoFit</Text>
            <Image
              className=" w-[8vh] h-[8vh]"
              source={require("../../../assets/logo.png")}
            />
          </View>
          <View>
            <Text className="font-semibold w-full text-center">
              Informe os dados para criarmos o plano de dieta e treino ideais :
            </Text>

            <View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="p-4 border rounded-md bg-white"
                    placeholder="Idade"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="firstName"
              />
              {errors.firstName && <Text>This is required.</Text>}

              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="p-4 border rounded-md bg-white"
                    placeholder="Altura"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="lastName"
              />
              <TouchableOpacity
                className="p-4 mt-4 shadow-orange-400 shadow-md bg-yellow-400 rounded-md"
                title="submit"
                onPress={handleSubmit(onSubmit)}
              >
                <Text className="text-center">Criar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <StatusBar />
        </View>
      </ImageBackground>
    </View>
  );
}
