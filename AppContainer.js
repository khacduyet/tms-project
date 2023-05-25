import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/screens/auth/login';
import { TabNavigatior } from './src/utils/navigators';
import Notification from './src/utils/notifications';
import HomeMore from './src/screens/more/index';
import { Screens } from './src/common/constant';
import Setting from './src/screens/more/setting';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './src/screens/loading';
import ChangePassword from './src/screens/more/settings/changepass';
import ForgotPassword from './src/screens/auth/forgot';
import { NotificationPage } from './src/screens/home/navbar';
import TestSchedule from './src/screens/schedules/testSchedule';
import Canhan from './src/screens/more/personal';
import Infor from './src/screens/more/personal/screen/infor';
import AttendancePage from './src/screens/attendance';
import TutorialPreview from './src/screens/tutorials';
import TrainingPlanPage from './src/screens/traningplan';
import DiemDanhSinhVien from './src/screens/schedules/popuup/diem_danh_sinh_vien';
import GhiChu from './src/screens/schedules/popuup/ghi_chu';
import BangGhiDiem from './src/screens/schedules/popuup/bang_ghi_diem';
import SoGiaoAn from './src/screens/schedules/popuup/so_giao_an';
import ChiTietBaiGiang from './src/screens/schedules/popuup/chi_tiet_bai_giang';
import KhaiBaoThucGiang from './src/screens/schedules/popuup/khai_bao_thuc_giang';
import DanhSachSoGiaoAn from './src/screens/schedules/popuup/danh_sach_so_giao_an';
import { ChatCustomPage, ChatGroupPage, ChatPersonalPage } from './src/screens/chat';
import { useEffect } from 'react';
import { setBaseUrl } from './src/redux/actions/baseurlAction';
import ChatBotPage from './src/screens/chatbot/ChatBotPage';

const Stack = createNativeStackNavigator();

export default function AppContainer() {
  const dispatch = useDispatch();
  Notification()
  const loading = useSelector((state) => state.loading);
  useEffect(() => {
    // dispatch(setBaseUrl());
  }, [])
  return (
    <NavigationContainer>
      <StackNavigator />
      {loading.loading && <Loading />}
    </NavigationContainer>
  );
}

function StackNavigator() {
  return <Stack.Navigator initialRouteName={Screens.Login} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={Screens.Tutorials} component={TutorialPreview} />
    <Stack.Screen name={Screens.Login} component={LoginPage} />
    <Stack.Screen name={Screens.More} component={HomeMore} />
    <Stack.Screen name={Screens.Notification} component={NotificationPage} />
    <Stack.Screen name={Screens.Setting} component={Setting} />
    <Stack.Screen name={Screens.TestSchedule} component={TestSchedule} />
    <Stack.Screen name={Screens.ChangePassword} component={ChangePassword} />
    <Stack.Screen name={Screens.ForgotPassword} component={ForgotPassword} />
    <Stack.Screen name={Screens.Home} component={TabNavigatior} />
    <Stack.Screen name={Screens.Personal} component={Canhan} />
    <Stack.Screen name={Screens.Attendance} component={AttendancePage} />
    <Stack.Screen name={Screens.TrainingPlan} component={TrainingPlanPage} />
    <Stack.Screen name={Screens.DiemDanhSinhVien} component={DiemDanhSinhVien} />
    <Stack.Screen name={Screens.GhiChu} component={GhiChu} />
    <Stack.Screen name={Screens.BangGhiDiem} component={BangGhiDiem} />
    <Stack.Screen name={Screens.SoGiaoAn} component={SoGiaoAn} />
    <Stack.Screen name={Screens.ChiTietBaiGiang} component={ChiTietBaiGiang} />
    <Stack.Screen name={Screens.KhaiBaoThucGiang} component={KhaiBaoThucGiang} />
    <Stack.Screen name={Screens.DanhSachSoGiaoAn} component={DanhSachSoGiaoAn} />
    <Stack.Screen name={Screens.TuyChon} component={ChatCustomPage} />
    <Stack.Screen name={Screens.ChatPersonalPage} component={ChatPersonalPage} />
    <Stack.Screen name={Screens.TaoNhom} component={ChatGroupPage} />
    <Stack.Screen name={Screens.ChatBot} component={ChatBotPage} />

  </Stack.Navigator>
}



