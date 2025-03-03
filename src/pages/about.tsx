import React from "react";
import { Container } from "@/components/ui/container";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Users, Lightbulb, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PurpleButton } from "@/components/ui/purple-button";

const AboutPage = () => {
  const navigate = useNavigate();

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former educator with 10+ years of experience in EdTech",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "AI specialist with a background in educational software",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      bio: "UX expert focused on creating intuitive learning experiences",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      bio: "Full-stack developer passionate about educational technology",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    },
  ];

  const values = [
    {
      title: "Education for All",
      description:
        "We believe in making quality educational tools accessible to everyone.",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Innovation",
      description:
        "We continuously explore new technologies to enhance the learning experience.",
      icon: Lightbulb,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Community",
      description:
        "We foster a supportive community of educators and learners.",
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from code to customer support.",
      icon: Award,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/30">
      <Header />
      <Container className="pt-20 pb-16">
        <div className="py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="hover:bg-white/50 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            About QuizGen
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to transform learning through interactive,
            AI-powered quizzes that make education more engaging and effective.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                QuizGen was founded in 2022 by a team of educators and
                technologists who saw the need for better assessment tools in
                the digital age. We recognized that traditional quizzes often
                fail to engage students and provide meaningful feedback.
              </p>
              <p>
                Our platform combines cutting-edge AI technology with
                educational best practices to generate quizzes that are not just
                tests, but learning experiences. By providing immediate feedback
                and celebrating success, we make the assessment process more
                engaging and effective.
              </p>
              <p>
                Today, QuizGen is used by thousands of educators, students, and
                professionals worldwide to create quizzes that enhance learning
                and retention.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl"></div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-6 bg-white/90 backdrop-blur-md shadow-md border border-white/30 hover:shadow-lg transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-full ${value.color} flex items-center justify-center mb-4`}
                >
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card
                key={index}
                className="p-6 bg-white/90 backdrop-blur-md shadow-md border border-white/30 hover:shadow-lg transition-all text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-100">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-purple-600 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Join Our Journey
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We're always looking for passionate individuals to join our team.
            Check out our current openings or reach out to learn more about how
            you can contribute to our mission.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <PurpleButton
              onClick={() => navigate("/contact")}
              showArrow={false}
            >
              Contact Us
            </PurpleButton>
            <Button
              variant="outline"
              className="border-purple-200 hover:border-purple-300 hover:bg-purple-50/50"
            >
              View Careers
            </Button>
          </div>
        </motion.div>
      </Container>
      <Footer />
    </div>
  );
};

export default AboutPage;
