import { createContext, useContext, useState } from "react";
import Snackbar, { SnackbarProps } from "../../components/common/Snackbar";

type SnackbarContextProps = {
  showSnackbar: (snackbar: SnackbarProps | null) => void;
};

export const SnackbarContext = createContext<SnackbarContextProps>({
  showSnackbar: () => {},
});

type Props = {
  children?: React.ReactNode;
};

export const SnackbarProvider: React.FC<Props> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<SnackbarProps | null>(null);

  const showSnackbar = (snackbar: SnackbarProps | null) => {
    setSnackbar(snackbar);
    setTimeout(() => {
      setSnackbar(null);
    }, 3000);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar snackbar={snackbar} />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
