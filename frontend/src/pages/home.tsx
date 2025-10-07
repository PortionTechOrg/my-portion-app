import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Users,
  Shield,
  Truck,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/shared/Logo";
import Footer from "@/components/Layout/footer";
import { useAuthStore } from "@/zustand/store";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isLoggedIn } = useAuthStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50 ">
        <div className="container mx-auto px-6 lg:px-16 py-4 flex items-center justify-between">
          <div>
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">
              How it Works
            </Link>
            <Link to="#benefits" className="text-gray-600 hover:text-primary transition-colors">
              Benefits
            </Link>
            <Link to="#testimonials" className="text-gray-600 hover:text-primary transition-colors">
              Reviews
            </Link>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className="bg-primary hover:bg-primary/90 text-white" size="lg" asChild>
              <Link to="/">Marketplace</Link>
            </Button>
            <Button className="bg-transparent text-black" variant="outline" size="lg" asChild>
              <Link to={isLoggedIn ? "/dashboard": "/login?vendor=true"}>Vendors</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-40"
            >
              <div className="container mx-auto px-6 py-6 space-y-4">
                <Link
                  to="#how-it-works"
                  className="block py-3 text-gray-600 hover:text-primary transition-colors border-b border-gray-100 last:border-b-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How it Works
                </Link>
                <Link
                  to="#benefits"
                  className="block py-3 text-gray-600 hover:text-primary transition-colors border-b border-gray-100 last:border-b-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Benefits
                </Link>
                <Link
                  to="#testimonials"
                  className="block py-3 text-gray-600 hover:text-primary transition-colors border-b border-gray-100 last:border-b-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reviews
                </Link>
                <div className="pt-4 space-y-3 border-t border-gray-100">
                  <Button variant="outline" size="lg" asChild className="w-full bg-primary hovoer:bg-primary/90 text-white">
                    <Link to="/">Marketplace</Link>
                  </Button>
                  <Button className="bg-transparent text-black hover:bg-primary/90 w-full" variant="outline" size="lg" asChild>
                    <Link to={isLoggedIn ? "/vendor": "/login?vendor=true"}>Vendors</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-[url('/bg.png')] bg-cover bg-center">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left: Text Content */}
            <div className="w-full lg:w-[55%] text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-6 py-2 rounded-full text-sm font-medium">
                  🎉 Join 10,000+ smart shoppers saving money
                </Badge>
              </motion.div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Buy More. <span className="text-primary">Pay Less.</span>
              </motion.h1>
              <motion.p
                className="text-lg text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Connect with verified wholesale food vendors and save up to 40%
                on groceries through group buying and bulk purchases.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <Button
                  asChild
                  size={"lg"}
                  className="h-12 text-base font-semibold"
                >
                  <Link to="/register">
                    Start Saving Today <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size={"lg"}
                  className="h-12 text-base font-semibold"
                >
                  <Link to="/register/vendor">Partner with Us</Link>
                </Button>
              </motion.div>
            </div>
            {/* Right: img */}
            <motion.div
              className="relative max-w-xl w-full flex justify-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            >
              <img
                src="/hero.png"
                alt="Portion Platform Dashboard"
                width={800}
                height={500}
                className="w-[80%] mx-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-gray-50/50">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              How Portion Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to start saving on your grocery bills
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Users className="w-8 h-8 text-white" />
              </motion.div>
              <div className="relative">
                <span className="absolute -top-4 -left-4 text-6xl font-bold text-primary/10">
                  01
                </span>
                <h3 className="text-2xl font-black mb-4 text-gray-900">
                  Create an Account
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                  Find existing buying groups or create your own to reach
                  minimum order quantities for wholesale prices.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <ShoppingCart className="w-8 h-8 text-white" />
              </motion.div>
              <div className="relative">
                <span className="absolute -top-4 -left-4 text-6xl font-bold text-secondary/10">
                  02
                </span>
                <h3 className="text-2xl font-black mb-4 text-gray-900">
                  Browse & Compare
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                  Compare prices from verified wholesalers and choose the best
                  deals on rice, beans, yam, and more.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Truck className="w-8 h-8 text-white" />
              </motion.div>
              <div className="relative">
                <span className="absolute -top-4 -left-4 text-6xl font-bold text-primary/10">
                  03
                </span>
                <h3 className="text-2xl font-black mb-4 text-gray-900">
                  Get Delivered
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                  Enjoy convenient delivery to your doorstep and track your
                  order every step of the way.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits - Redesigned */}
      <section id="benefits" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">Why Choose Portion?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience the benefits of smart bulk buying</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="border border-gray-200 shadow-none bg-white transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl text-gray-600">💰</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Save Up to 40%</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Get wholesale prices through group buying and bulk purchases
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="border border-gray-200 shadow-none bg-white transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Verified Sellers</h3>
                  <p className="text-gray-600 leading-relaxed">
                    All wholesalers are thoroughly vetted and verified for quality
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="border border-gray-200 shadow-none bg-white transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Group Buying</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Join with neighbors and friends to unlock better prices
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="border border-gray-200 shadow-none bg-white transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Truck className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Fast Delivery</h3>
                  <p className="text-gray-600 leading-relaxed">Quick and reliable delivery straight to your door</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-primary text-white">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Start Saving?
            </h2>
            <p className="text-xl lg:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of smart shoppers and start saving on your grocery
              bills today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Input
                placeholder="Enter your email address"
                className="bg-white text-gray-900 border-0 h-12 text-lg px-4"
              />
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white h-12 px-8"
              >
                Get Started
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-6">
              No spam, unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
