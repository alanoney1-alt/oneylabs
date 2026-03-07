import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Workshops from "./pages/Workshops";
import Contact from "./pages/Contact";
import AISearchVisibility from "./pages/AISearchVisibility";
import AIConsulting from "./pages/AIConsulting";
import BuildWithMe from "./pages/BuildWithMe";
import WhatIsAISearchVisibility from "./pages/WhatIsAISearchVisibility";
import AISearchAuditOrlando from "./pages/AISearchAuditOrlando";
import HowToShowUpInChatGPT from "./pages/HowToShowUpInChatGPT";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/about" component={About} />
      <Route path="/workshops" component={Workshops} />
      <Route path="/contact" component={Contact} />
      <Route path="/ai-search-visibility" component={AISearchVisibility} />
      <Route path="/ai-consulting" component={AIConsulting} />
      <Route path="/build-with-me" component={BuildWithMe} />
      <Route path="/what-is-ai-search-visibility" component={WhatIsAISearchVisibility} />
      <Route path="/ai-search-audit-orlando" component={AISearchAuditOrlando} />
      <Route path="/how-to-show-up-in-chatgpt" component={HowToShowUpInChatGPT} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
