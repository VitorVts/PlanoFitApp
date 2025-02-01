import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import {
  TextInput,
  Button,
  ProgressBar,
  RadioButton,
  Text,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaskService } from "react-native-masked-text";
import { z } from "zod";

const labels = [
  "Data de Nascimento? (DD/MM/YYYY)",
  "Qual é a sua altura (em cm)?",
  "Qual é o seu peso (em kg)?",
  "Qual é o seu objetivo principal?",
  "Qual é o seu sexo?",
];

const options = {
  "Qual é o seu objetivo principal?": [
    "Perder peso",
    "Ganhar massa muscular",
    "Manter o peso",
  ],
  "Qual é o seu sexo?": ["Masculino", "Feminino"],
};

const Home = () => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(Array(labels.length).fill(""));
  const [errors, setErrors] = useState(Array(labels.length).fill(""));

  const totalSteps = labels.length;
  const progress = (step + 1) / totalSteps;

  const handleNext = () => {
    const { isValid, errors } = validateForm();

    if (!isValid) {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[step] = errors[0];

        return newErrors;
      });

      return;
    }

    setStep((prev) => Math.min(prev + 1, totalSteps - 1));
    setErrors(Array(labels.length).fill(""));
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmitAll = () => {
    const allData = {
      data_nascimento: values[0],
      altura: values[1].replace(",", "."),
      peso: values[2].replace(",", "."),
      objetivo: values[3],
      sexo: values[4],
    };
    console.log("Todos os dados em JSON:", JSON.stringify(allData));
  };

  const validateForm = () => {
    const validationSchema = z.object({
      data_nascimento: z
        .string()
        .refine(
          (val) => /\d{2}\/\d{2}\/\d{4}/.test(val),
          "Formato de data inválido. Use DD/MM/YYYY."
        )
        .refine((val) => {
          const birthDate = new Date(val.split("/").reverse().join("-"));
          const age = new Date().getFullYear() - birthDate.getFullYear();
          const monthDifference = new Date().getMonth() - birthDate.getMonth();
          return age > 18 || (age === 18 && monthDifference >= 0); // Verifica se a idade é maior ou igual a 18 anos
        }, "A idade deve ser maior ou igual a 18 anos."),
      altura: z
        .string()
        .refine(
          (val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 3,
          "A altura deve ser um número entre 1.00 e 3.00 m."
        ),
      peso: z
        .string()
        .refine(
          (val) =>
            !isNaN(Number(val)) && Number(val) >= 30 && Number(val) <= 300,
          "O peso deve ser um número entre 30 e 300 kg."
        ),
    });

    try {
      if (step === 0) {
        validationSchema.pick({ data_nascimento: true }).parse({
          data_nascimento: values[0],
        });
      } else if (step === 1) {
        validationSchema.pick({ altura: true }).parse({
          altura: values[1],
        });
      } else if (step === 2) {
        validationSchema.pick({ peso: true }).parse({
          peso: values[2],
        });
      }
      return { isValid: true, errors: [] };
    } catch (error) {
      return {
        isValid: false,
        errors: (error as z.ZodError).errors.map((err) => err.message),
      };
    }
  };

  const currentLabel = labels[step];
  const isRadioStep =
    currentLabel === "Qual é o seu objetivo principal?" ||
    currentLabel === "Qual é o seu sexo?";

  const handleInputChange = (text: string) => {
    const newValues = [...values];
    newValues[step] = text.replace(",", ".");
    setValues(newValues);
  };

  const toMask = (
    mask: string,
    value: string,
    precision?: number,
    format?: string
  ) => {
    return MaskService.toMask("custom", value, {
      mask: mask,
      precision: precision,
      format: format,
    });
  };
  const applyMask = (value: string) => {
    if (currentLabel === "Data de Nascimento? (DD/MM/YYYY)") {
      return toMask("99/99/9999", value, undefined, "DD/MM/YYYY");
    }
    if (currentLabel === "Qual é a sua altura (em cm)?") {
      return toMask("9.99", value, 1);
    }
    if (currentLabel === "Qual é o seu peso (em kg)?") {
      return toMask("99.99", value, 2);
    }
    return value;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <ProgressBar
          progress={progress}
          color={useTheme().colors.primary}
          style={styles.progress}
        />

        {isRadioStep ? (
          <View>
            <Text style={styles.radioLabel}>{currentLabel}</Text>
            <RadioButton.Group
              onValueChange={(value) => {
                const newValues = [...values];
                newValues[step] = value;
                setValues(newValues);
              }}
              value={values[step]}
            >
              {options[currentLabel].map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.radioOption}
                  onPress={() => {
                    const newValues = [...values];
                    newValues[step] = option;
                    setValues(newValues);
                  }}
                >
                  <View style={styles.radioContainer}>
                    <RadioButton value={option} />
                    <Text style={styles.radioText}>{option}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </RadioButton.Group>
          </View>
        ) : (
          <TextInput
            label={currentLabel}
            value={applyMask(values[step])}
            onChangeText={handleInputChange}
            style={styles.input}
            keyboardType={
              currentLabel === "Data de Nascimento? (DD/MM/YYYY)"
                ? "default"
                : "numeric"
            }
            error={!!errors[step]}
          />
        )}

        {errors[step] && <Text style={styles.errorText}>{errors[step]}</Text>}

        <View style={styles.buttonContainer}>
          {step > 0 && (
            <Button mode="outlined" onPress={handlePrev}>
              Voltar
            </Button>
          )}
          {step < totalSteps - 1 ? (
            <Button mode="contained" onPress={handleNext}>
              Próximo
            </Button>
          ) : (
            <Button mode="contained" onPress={handleSubmitAll}>
              Enviar
            </Button>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16 },
  progress: { height: 10, borderRadius: 5, marginBottom: 16 },
  input: { marginBottom: 16 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
  },
  radioLabel: {
    fontSize: 24,
    marginBottom: 8,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioText: {
    marginLeft: 8,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
    fontSize: 14,
  },
});

export default Home;
