import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, TrendingUp, Shield, BarChart3, Wallet, Target, Users, Star, CheckCircle, PieChart, Calendar, CreditCard } from 'lucide-react';

export const LandingPage = () => {
  const [email, setEmail] = useState('');
  const { login, loginWithGoogle, isLoading } = useAuth();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await login(email);
    }
  };

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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">Meus Envelopes</h1>
          </div>
          <ThemeToggle />
        </header>

        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-tight">
              Transforme suas Finanças
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              A plataforma mais inteligente para controlar seus gastos, planejar seu futuro e alcançar suas metas financeiras.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-card/50 backdrop-blur border border-border/50">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Login Card */}
          <Card className="max-w-md mx-auto shadow-xl border border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">Comece Gratuitamente</CardTitle>
              <CardDescription className="text-base">
                Faça login e transforme sua vida financeira hoje mesmo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                onClick={loginWithGoogle}
                disabled={isLoading}
                className="w-full h-12 text-base"
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

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-muted-foreground font-medium">Ou</span>
                </div>
              </div>

              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <Button type="submit" disabled={isLoading || !email} className="w-full h-11" variant="outline">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Entrar com Email
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Por que escolher Meus Envelopes?</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A solução completa para transformar sua relação com o dinheiro
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
            
            {/* Visual Graph Mockup */}
            <div className="relative">
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Visão Geral dos Gastos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-sm">Alimentação</span>
                      </div>
                      <span className="font-medium">R$ 1.200</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Transporte</span>
                      </div>
                      <span className="font-medium">R$ 800</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Entretenimento</span>
                      </div>
                      <span className="font-medium">R$ 400</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary via-blue-500 to-green-500 w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Recursos Poderosos</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para ter controle total das suas finanças
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-primary/10 hover:border-primary/30">
                <CardContent className="pt-6">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 rounded-full bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20">
            <CardContent className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold">Pronto para transformar sua vida financeira?</h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Junte-se a milhares de pessoas que já estão no controle das suas finanças
              </p>
              <Button size="lg" className="text-lg px-8 py-4 h-auto">
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