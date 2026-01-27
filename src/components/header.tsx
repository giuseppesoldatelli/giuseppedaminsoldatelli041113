"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-end p-4 z-50">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="text-xs sm:text-sm text-muted-foreground hover:text-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-border hover:border-primary/50 font-medium bg-card/80 backdrop-blur-sm shadow-sm"
          >
            Entrar
            <ChevronDown
              className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
              strokeWidth={1.5}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="rounded-xl shadow-lg border-0 p-6 w-80"
        >
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="login" className="flex-1">
                Entrar
              </TabsTrigger>
              <TabsTrigger value="register" className="flex-1">
                Cadastrar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="focus-visible:ring-primary"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full"
                >
                  Entrar
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="seu@email.com"
                    className="focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Senha</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    className="focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Senha</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="focus-visible:ring-primary"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full"
                >
                  Cadastrar
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </header>
  );
}
