import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Box from "@mui/material/Box";

const DefaultLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100px" }}>
      <Header />
      {/* aqui vem o conteudo da pagina */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default DefaultLayout;
