import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderBack from "../../common/header";
import { Screens } from "../../common/constant";
import { DataTable } from "react-native-paper";
import { faker } from "@faker-js/faker";

export default function TrainingPlanPage() {
  return (
    <SafeAreaView style={[styles.container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <HeaderBack header={Screens.TrainingPlan} />
        <View style={[styles.wrapper]}>
          <View style={[s.header]}>
            <Text style={[s.text]}>Kế hoạch đào tạo: 22/25CĐ-Han 67</Text>
          </View>
        </View>
        <View>
          <DataTable>
            <DataTable.Header style={[tbl.header]}>
              <DataTable.Title style={[tbl.title, { width: 10 }]}>
                TT
              </DataTable.Title>
              <DataTable.Title style={[tbl.title]} numberOfLines={2}>
                Mã học phần
              </DataTable.Title>
              <DataTable.Title style={[tbl.title]} numberOfLines={2}>
                Tên học phần
              </DataTable.Title>
              <DataTable.Title style={[tbl.title]} numberOfLines={2}>
                Học kỳ
              </DataTable.Title>
              <DataTable.Title style={[tbl.title]} numberOfLines={2}>
                Tín chỉ
              </DataTable.Title>
              <DataTable.Title style={[tbl.title]} numberOfLines={2}>
                Thời gian (giờ)
              </DataTable.Title>
              <DataTable.Title style={[tbl.title]} numberOfLines={2}>
                Hoàn thành
              </DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={[...Array(20)]}
              renderItem={(item) => (
                <DataTable.Row style={[tbl.row]}>
                  <DataTable.Cell
                    style={[tbl.cell, { justifyContent: "center", width: 10 }]}
                  >
                    {item.index + 1}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={[tbl.cell, { justifyContent: "center" }]}
                  >
                    {faker.random.locale()}
                  </DataTable.Cell>
                  <DataTable.Cell style={[tbl.cell]}>
                    {faker.name.firstName()}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={[tbl.cell, { justifyContent: "center" }]}
                  >
                    {faker.helpers.arrayElement(["I", "II", "V", "IV", "III"])}
                  </DataTable.Cell>
                  <DataTable.Cell style={[tbl.cell]} numeric>
                    {faker.datatype.number()}
                  </DataTable.Cell>
                  <DataTable.Cell style={[tbl.cell]} numeric>
                    {faker.datatype.number()}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={[tbl.cell, { justifyContent: "center" }]}
                    numeric
                  >
                    X
                  </DataTable.Cell>
                </DataTable.Row>
              )}
              ListFooterComponent={<View style={{ height: 200 }}></View>}
            />
          </DataTable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  wrapper: {
    margin: 16,
  },
});

const tbl = StyleSheet.create({
  header: {},
  title: {
    borderWidth: 0.2,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {},
  cell: {
    borderWidth: 0.2,
  },
});

const s = StyleSheet.create({
  header: {
    width: "100%",
  },
  text: {
    fontSize: 16,
  },
});
