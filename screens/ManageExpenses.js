import { useLayoutEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import CustomButton from "../components/UI/Button";
import IconButton from "../components/UI/iconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/ExpenseContext";

function ManageExpenses({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteHandler() {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, {
        description: "Test edit",
        amount: 29.99,
        date: new Date("2020-08-28"),
      });
    } else {
      expensesCtx.addExpense({
        description: "Text",
        amount: 19.99,
        date: new Date("2022-05-17"),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <CustomButton style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </CustomButton>
        <CustomButton style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </CustomButton>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
