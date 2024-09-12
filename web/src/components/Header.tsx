import { AppBar, Button, Link } from "@mui/material";

export default function Header() {
  return (
    <AppBar
      position={"static"}
      sx={{
        height: "48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <Link href="/">
        <Button size="large" sx={{ color: "#FFF" }}>
          Home
        </Button>
      </Link>
    </AppBar>
  );
}
