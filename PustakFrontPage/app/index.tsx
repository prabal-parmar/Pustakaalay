import { Redirect } from "expo-router";

export default function Index() {
  const isLoggedIn = false;
  const role = "seller";

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  if (role === "seller") {
    return <Redirect href="/(seller)/home" />;
  }

  return <Redirect href="/(buyer)/home" />;
}
