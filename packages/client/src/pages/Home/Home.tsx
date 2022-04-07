import React, { useMemo, useState } from "react";
import UnSignedUser from "./UnSignedUser";

export default React.memo(Home);

function Home() {
  //TODO: get user from redux
  const [user, setUser] = useState();
  const isLoggedIn = useMemo(() => !!user, [user]);
  const isPlayer = useMemo(
    () => isLoggedIn /*  &&!!user.type === "player",*/,
    [isLoggedIn]
  );

  if (!isLoggedIn) {
    return <UnSignedUser />;
  }
  if (isPlayer) {
    return <div>player</div>;
  }
  return <div>manger</div>;
}
