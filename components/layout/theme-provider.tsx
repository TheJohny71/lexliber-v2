import { createContext, useContext, useEffect, useState } from "react"
import { useTheme } from "next-themes"

const ThemeContext = createContext({ themeStyle: "system", setThemeStyle: (theme: string) => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeStyle, setThemeStyle] = useState("system")
  const { theme, setTheme } = useTheme()

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