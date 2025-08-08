import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, TrendingUp, Shield, BarChart3, Wallet, Target, Users, Star, CheckCircle, PieChart, Calendar, CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';

export const LandingPage = () => {
  const { loginWithGoogle, isLoading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const features = [
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Dashboard Intuitivo",
      description: "Visualize suas finanças de forma clara e organizada com gráficos e relatórios detalhados."
    },
    {
      icon: <Wallet className="h-8 w-8 text-primary" />,
      title: "Gestão de Envelopes",
      description: "Organize seu dinheiro em categorias e controle seus gastos com o método de envelopes."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Análises Avançadas",
      description: "Entenda seus padrões de gastos e tome decisões financeiras mais inteligentes."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Segurança Total",
      description: "Seus dados estão protegidos com as melhores práticas de segurança do mercado."
    }
  ];

  const stats = [
    {
      icon: <Users className="h-6 w-6" />,
      value: "10.000+",
      label: "Usuários ativos"
    },
    {
      icon: <Target className="h-6 w-6" />,
      value: "95%",
      label: "Melhoria no controle"
    },
    {
      icon: <Star className="h-6 w-6" />,
      value: "4.9",
      label: "Avaliação média"
    }
  ];

  const benefits = [
    "Controle total de gastos",
    "Planejamento financeiro eficiente",
    "Relatórios detalhados",
    "Interface moderna e intuitiva",
    "Sincronização em tempo real",
    "Suporte especializado"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Sticky Header with Glassmorphism */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-background/80 border-b border-border/20' : 'bg-transparent'} animate-fade-in`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center hover-scale">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg md:text-xl font-bold">Meus Envelopes</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              onClick={loginWithGoogle}
              disabled={isLoading}
              className="flex items-center gap-1 md:gap-2 hover-scale text-sm md:text-base px-3 md:px-4"
              variant="outline"
              size="sm"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Login
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content with padding for sticky header */}
      <div className="container mx-auto px-4 md:px-6 pt-20 md:pt-28 pb-8">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-24 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-tight animate-scale-in">
              Transforme suas Finanças
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in [animation-delay:0.2s]">
              A plataforma mais inteligente para controlar seus gastos, planejar seu futuro e alcançar suas metas financeiras.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 p-4 md:p-6 rounded-lg bg-card/50 backdrop-blur border border-border/50 hover-scale animate-fade-in" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                  <div className="p-2 md:p-3 rounded-full bg-primary/10 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action Card */}
          <Card className="max-w-sm md:max-w-md mx-auto shadow-xl border border-primary/20 bg-card/80 backdrop-blur-sm animate-scale-in">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl md:text-2xl">Comece Gratuitamente</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Transforme sua vida financeira hoje mesmo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={loginWithGoogle}
                disabled={isLoading}
                className="w-full h-12 text-base hover-scale"
                size="lg"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                Continuar com Google
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="mb-16 md:mb-24 animate-fade-in">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Por que escolher Meus Envelopes?</h3>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A solução completa para transformar sua relação com o dinheiro
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center mb-12 md:mb-16">
            <div className="space-y-4 md:space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 animate-fade-in hover-scale" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-500 flex-shrink-0" />
                  <span className="text-base md:text-lg">{benefit}</span>
                </div>
              ))}
            </div>
            
            {/* Visual Graph Mockup */}
            <div className="relative animate-scale-in">
              <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover-scale">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <PieChart className="h-4 w-4 md:h-5 md:w-5" />
                    Visão Geral dos Gastos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-sm">Alimentação</span>
                      </div>
                      <span className="font-medium text-sm md:text-base">R$ 1.200</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Transporte</span>
                      </div>
                      <span className="font-medium text-sm md:text-base">R$ 800</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Entretenimento</span>
                      </div>
                      <span className="font-medium text-sm md:text-base">R$ 400</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-6 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary via-blue-500 to-green-500 w-3/4 animate-[width_1s_ease-out]"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16 md:mb-24 animate-fade-in">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Recursos Poderosos</h3>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para ter controle total das suas finanças
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-4 md:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-primary/10 hover:border-primary/30 animate-fade-in hover-scale" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-4 md:pt-6">
                  <div className="mb-4 md:mb-6 flex justify-center">
                    <div className="p-3 md:p-4 rounded-full bg-primary/10 text-primary">
                      <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{feature.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-12 md:mb-16 animate-scale-in">
          <Card className="max-w-4xl mx-auto p-6 md:p-12 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20 hover-scale">
            <CardContent className="space-y-4 md:space-y-6">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">Pronto para transformar sua vida financeira?</h3>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Junte-se a milhares de pessoas que já estão no controle das suas finanças
              </p>
              <Button 
                onClick={loginWithGoogle}
                disabled={isLoading}
                size="lg" 
                className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto hover-scale"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" />
                ) : null}
                Começar Agora - É Grátis
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="text-center text-muted-foreground border-t border-border/50 pt-8">
          <p>&copy; 2024 Meus Envelopes. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};