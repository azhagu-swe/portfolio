import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { CONTACT_DATA } from "@/utils/contactData";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const ContactPage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const validateForm = () => {
    const errors = {
      name: formData.name.trim() === "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      message: formData.message.trim() === "",
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    // In a real application, you would send the data to a backend service
    // For now we'll simulate the process and open the email client
    const { name, email, message } = formData;
    const subject = `Message from ${name}`;
    const body = `${message}

From: ${name} (${email})`;
    const mailtoLink = `mailto:azhagu.swe@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    try {
      // Reset form before opening email client to prevent resubmission
      setFormData({ name: "", email: "", message: "" });

      // Check if running in test environment or if window.location is available
      if (typeof window !== "undefined" && window.location) {
        // Open email client
        window.location.href = mailtoLink;
      } else {
        // For testing purposes, just log the action
        console.log("Mailto link would be:", mailtoLink);
      }

      setSubmitSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      setSubmitError("Failed to send message. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-background via-background to-secondary/5"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={itemVariants}
          className="text-center mb-12 pt-4"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-primary font-orbitron mb-2">
            {CONTACT_DATA.title}
          </h1>
          <h2 className="text-xl text-muted-foreground mb-6">
            {CONTACT_DATA.subtitle}
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            {CONTACT_DATA.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          <motion.div
            variants={itemVariants}
            className="md:col-span-5"
          >
            <Card className="h-full border-border bg-card/50 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground mb-8">
                  Feel free to reach out using any of the methods below. I&apos;ll
                  get back to you as soon as possible.
                </p>

                <div className="space-y-6 mb-8">
                  <Separator />
                  <h3 className="text-lg font-bold">Contact Information</h3>

                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 bg-primary flex items-center justify-center">
                      <Icon icon="mdi:email-outline" width={24} height={24} className="text-primary-foreground" />
                    </Avatar>
                    <div>
                      <p className="font-bold">Email</p>
                      <a href="mailto:azhagu.swe@gmail.com" className="text-primary hover:underline">
                        azhagu.swe@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 bg-secondary flex items-center justify-center">
                      <Icon icon="mdi:phone" width={24} height={24} className="text-secondary-foreground" />
                    </Avatar>
                    <div>
                      <p className="font-bold">Phone</p>
                      <p className="text-muted-foreground text-sm">
                        Available upon request
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="mb-6" />
                <h3 className="text-lg font-bold mb-4">Follow Me</h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {CONTACT_DATA.socialLinks.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      className="h-full"
                    >
                      <Card
                        className="h-full p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all duration-300 border-border bg-background"
                        onClick={() => window.open(item.link, "_blank")}
                        style={{ borderColor: 'transparent' }} // Override to use hover effect
                      >
                        <Icon
                          icon={item.icon}
                          style={{
                            fontSize: 32,
                            color: item.color,
                            marginBottom: "8px",
                          }}
                        />
                        <span className="text-xs font-bold">{item.platform}</span>
                        <span className="text-[10px] text-muted-foreground break-all mt-1">
                          {item.username}
                        </span>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="md:col-span-7"
          >
            <Card className="h-full border-border bg-card/50 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Send a Message
                </h2>
                <p className="text-muted-foreground mb-6">
                  Fill out the form below and I&#39;ll get back to you as soon as
                  possible.
                </p>

                {/* Success/Error Messages */}
                {submitSuccess && (
                  <div className="mb-4 p-4 rounded-lg bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 font-bold text-sm">
                    Message sent successfully! Opening email client...
                  </div>
                )}

                {submitError && (
                  <div className="mb-4 p-4 rounded-lg bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 font-bold text-sm">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {CONTACT_DATA.form.nameLabel}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={cn(formErrors.name && "border-red-500 focus-visible:ring-red-500")}
                    />
                    {formErrors.name && (
                      <p className="text-xs text-red-500">Please enter your name</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {CONTACT_DATA.form.emailLabel}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={cn(formErrors.email && "border-red-500 focus-visible:ring-red-500")}
                    />
                    {formErrors.email && (
                      <p className="text-xs text-red-500">Please enter a valid email address</p>
                    )}
                  </div>

                  <div className="space-y-2 flex-grow">
                    <label htmlFor="message" className="text-sm font-medium">
                      {CONTACT_DATA.form.messageLabel}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className={cn("resize-none h-full min-h-[120px]", formErrors.message && "border-red-500 focus-visible:ring-red-500")}
                    />
                    {formErrors.message && (
                      <p className="text-xs text-red-500">Please enter your message</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="self-start mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Icon
                          icon="svg-spinners:3-dots-fade"
                          className="mr-2"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Icon icon="mdi:send" className="mr-2" />
                        {CONTACT_DATA.form.submitText}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
