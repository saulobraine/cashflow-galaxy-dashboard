import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-2xl px-8">
        {/* Imagem cômica do gato */}
        <div className="mb-8">
          <img 
            src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=300&fit=crop&crop=center"
            alt="Gatinho perdido"
            className="mx-auto rounded-lg shadow-lg w-64 h-48 object-cover"
          />
        </div>
        
        {/* Texto principal */}
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Ops! Esta página saiu para comprar ração
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Parece que você encontrou um cantinho da internet que não existe... 
          ou talvez esteja escondido como este gatinho! 🐱
        </p>
        
        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" size="lg">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Voltar ao Início
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Tentar Novamente
          </Button>
        </div>
        
        {/* Texto adicional engraçado */}
        <p className="text-sm text-muted-foreground mt-8 italic">
          "Não sou eu que estou perdido, é você que não sabe onde está!" - O Gato, provavelmente
        </p>
      </div>
    </div>
  );
};

export default NotFound;
