import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import Button from "../UI/Button";
import Input from "./Input";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date : new Date(),
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function amountChangedHandler(enteredValue) {
    const normalized = enteredValue.replace(",", ".").replace(/[^0-9.]/g, "");
    const parts = normalized.split(".");
    const withSingleDot =
      parts.length <= 1 ? normalized : `${parts[0]}.${parts.slice(1).join("")}`;

    inputChangedHandler("amount", withSingleDot);
  }

  function showDatePickerHandler() {
    setShowDatePicker(true);
  }

  function dateChangeHandler(event, selectedDate) {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (event?.type === "dismissed") {
      return;
    }

    const pickedDate = selectedDate ?? inputs.date.value;
    inputChangedHandler("date", pickedDate);

    if (Platform.OS === "ios") {
      setShowDatePicker(false);
    }
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: inputs.date.value,
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount >= 0;
    const dateIsValid =
      expenseData.date instanceof Date && !isNaN(expenseData.date.getTime());
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.card}>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: amountChangedHandler,
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            editable: false,
            showSoftInputOnFocus: false,
            onPressIn: showDatePickerHandler,
            value: inputs.date.value ? getFormattedDate(inputs.date.value) : "",
          }}
        />
      </View>

      {showDatePicker && (
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={inputs.date.value ?? new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "compact" : "default"}
            onChange={dateChangeHandler}
          />
        </View>
      )}

      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none'
          // autoCorrect: false // default is true
          onChangeText: inputChangedHandler.bind(this, "description"),
          maxLength: 300,
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginVertical: 16,
    textAlign: "center",
  },
  card: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: GlobalStyles.colors.primary700,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary400,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  pickerContainer: {
    marginHorizontal: 4,
    marginBottom: 8,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: GlobalStyles.colors.primary100,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
