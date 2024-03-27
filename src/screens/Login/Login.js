import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, TouchableOpacity, TextInput, ImageBackground, Image } from "react-native";


export default function login() {
 return (
    <View className=" bg-white">
    <ImageBackground className="h-full w-full flex items-center justify-center"  source={require('../../assets/bg-login.webp')}>
    <View className="w-5/6 rounded-md p-10 bg-white/90 shadow-orange-400 ">
    <View className="flex flex-row justify-center  items-center w-full">
      <Text className="font-semibold text-5xl p-4">PlanoFit</Text> 
      <Image className=" w-[8vh] h-[8vh]" source={require('../../assets/logo.png')}/>
    
    </View>
    <View>
    <Text>Usuário:</Text>
    <TextInput className="border border-gray-400 rounded-md p-2 bg-white" placeholder="Planofit" />
    </View>
    <View className="mt-4" >
    <Text>Senha:</Text>
    <TextInput className="border border-gray-400 rounded-md p-2 bg-white " placeholder="*******" />
    </View>

    <TouchableOpacity className="p-4 mt-4 shadow-orange-400 shadow-md bg-yellow-400 rounded-md"><Text className="text-center">Entrar</Text></TouchableOpacity>

    <StatusBar />
    </View>
    </ImageBackground>
  </View>
  );
}