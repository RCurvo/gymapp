import { StatusBar } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import {
  useFonts,
  Roboto_400Regular as RobotoRegular,
  Roboto_700Bold as RobotoBold,
} from '@expo-google-fonts/roboto'
import { THEME } from './src/theme'
import { Loading } from '@components/Loading'
import { SignUp } from '@screens/SignUp'

export default function App() {
  const [fontsLoaded] = useFonts({ RobotoRegular, RobotoBold })
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <SignUp /> : <Loading />}
    </NativeBaseProvider>
  )
}
