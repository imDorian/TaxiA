// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import "./global.css"
// export default function App() {
//   return (
//     <SafeAreaProvider>

//     </SafeAreaProvider >
//   );
// }

export default function App() {
  const foo = undefined;
  console.log(foo.bar); // Esto debería crashear

  return null;
}
