import { createContext, useContext, useEffect, useState } from "react"
import { useTheme } from "next-themes"

type ThemeContextType = {
  themeStyle: string;
  setThemeStyle: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({ 
  themeStyle: "system", 
  setThemeStyle: () => {} 
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeStyle, setThemeStyle] = useState("system")
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme(themeStyle)
  }, [themeStyle, setTheme])

  return (
    <ThemeContext.Provider value={{ themeStyle, setThemeStyle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)