import styles from "../styles/Home.module.css";

import StytchLogin from "../components/StytchLogin";
import Profile from "../components/Profile";
import { getAuthenticatedUserFromSession } from "../utils/stytchLogic";
import { getSupabase } from "../utils/supabase";

const Index = ({ user, publicToken }) => {
  let content;
  if (user) {
    content = <Profile user={user} />;
  } else {
    content = <StytchLogin publicToken={publicToken} />;
  }

  return <div className={styles.main}>{content}</div>;
};

export async function getServerSideProps({ req, res }) {
  const userId = await getAuthenticatedUserFromSession(req, res);

  if (userId) {
    const supabase = getSupabase(userId);
    const { data: expenses } = await supabase.from("expenses").select("*");

    return {
      props: {
        user: { userId, expenses },
        publicToken: process.env.STYTCH_PUBLIC_TOKEN,
      },
    };
  } else {
    return {
      props: { publicToken: process.env.STYTCH_PUBLIC_TOKEN },
    };
  }
}

export default Index;
