import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, TrendingUp, Shield, BarChart3, Wallet } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">Finance Dashboard</h1>
          </div>
          <ThemeToggle />
        </header>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Gerencie suas Finanças com Inteligência
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Tenha controle total sobre suas finanças pessoais com nossa plataforma moderna e intuitiva.
              Organize, acompanhe e otimize seus gastos de forma simples e eficiente.
            </p>
          </div>

          {/* Login Card */}
          <Card className="max-w-md mx-auto shadow-lg border-primary/20">
            <CardHeader>
              <CardTitle>Comece Agora</CardTitle>
              <CardDescription>
                Faça login para acessar seu dashboard financeiro
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={loginWithGoogle}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
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
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Ou</span>
                </div>
              </div>

              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={isLoading || !email} className="w-full" variant="outline">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Entrar com Email
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center text-muted-foreground">
          <p>&copy; 2024 Finance Dashboard. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};