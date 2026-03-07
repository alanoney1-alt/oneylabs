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
import Blog from "./pages/Blog";
import BlogPost1 from "./pages/BlogPost1";
import BlogPost2 from "./pages/BlogPost2";
import BlogPost3 from "./pages/BlogPost3";
import VisibilityChecker from "./pages/VisibilityChecker";
import LocationPage from "./pages/LocationPage";
import BlogCMS from "./pages/BlogCMS";
import BlogPostDynamic from "./pages/BlogPostDynamic";
import BookingPage from "./pages/BookingPage";
import AdminDashboard from "./pages/AdminDashboard";
import ChatWidget from "./components/ChatWidget";

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
      <Route path="/blog" component={Blog} />
      <Route path="/blog/best-hvac-company-orlando-chatgpt" component={BlogPost1} />
      <Route path="/blog/how-to-show-up-in-perplexity" component={BlogPost2} />
      <Route path="/blog/chatgpt-vs-google-local-business" component={BlogPost3} />
      <Route path="/blog/posts" component={BlogCMS} />
      <Route path="/blog/posts/:slug" component={BlogPostDynamic} />
      <Route path="/visibility-checker" component={VisibilityChecker} />
      <Route path="/book" component={BookingPage} />
      <Route path="/ai-consulting/:slug" component={LocationPage} />
      <Route path="/admin" component={AdminDashboard} />
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
          <ChatWidget />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
