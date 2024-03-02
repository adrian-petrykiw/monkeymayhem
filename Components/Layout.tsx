import Navigation from './Navigation';
import { Container } from '@chakra-ui/react';
import Auth from '../pages/auth';
import { DynamicContextProvider } from "@dynamic-labs/sdk-react";



const Layout = ({ children }) => {
  return (
    <>
      {/* <Navigation /> */}
      {/* <Container m={3}>{children}</Container> */}
      <DynamicContextProvider
      settings={{
        appLogoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/3/34/Examplelogo.svg",
        appName: "Example App",
        environmentId: "35ffa6e7-6b7b-4351-8c2a-4a025022a2db",
      }}
    >
      <Auth />
    </DynamicContextProvider>
    </>
  );
};

export default Layout;
