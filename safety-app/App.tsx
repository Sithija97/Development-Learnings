import "react-native-gesture-handler";
import Navigation from "./Navigation";
import { store } from "./store/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
