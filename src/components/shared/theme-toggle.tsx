"use client";

//Custom UI components
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

//Icons
import { MoonIcon, SunIcon } from "lucide-react";
//useTheme hook to automatically set the theme
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-full">
                <SunIcon className="h-[1.4rem] w-[1.4rem]" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="w-10 h-10 rounded-full">
                    {theme === 'dark' ? (
                        <MoonIcon className="h-[1.4rem] w-[1.4rem] transition-all duration-300" />
                    ) : (
                        <SunIcon className="h-[1.4rem] w-[1.4rem] transition-all duration-300" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}