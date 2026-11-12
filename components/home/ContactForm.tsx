import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate form submission (Replace with actual Formspree endpoint if available)
    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section
      id="contacto"
      className="relative w-full max-w-7xl mx-auto px-6 py-24 md:py-32 scroll-mt-24"
    >
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
        {/* Text Side */}
        <div className="w-full md:w-1/3 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              {t("contact.badge")}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {t("contact.title_pre")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                {t("contact.title_highlight")}
              </span>
            </h2>
            <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
              {t("contact.description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 text-sm text-neutral-300">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <p className="font-bold text-white">{t("contact.email_me")}</p>
                <a
                  href="mailto:usquizafranquer@gmail.com"
                  className="hover:text-cyan-400 transition-colors"
                >
                  usquizafranquer@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-2/3">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-[#111] border border-cyan-500/30 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group"
          >
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-xs font-bold text-neutral-500 uppercase tracking-wider ml-1"
                >
                  {t("contact.form.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all text-sm"
                  placeholder={t("contact.form.name_placeholder")}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-bold text-neutral-500 uppercase tracking-wider ml-1"
                >
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all text-sm"
                  placeholder={t("contact.form.email_placeholder")}
                />
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <label
                htmlFor="subject"
                className="text-xs font-bold text-neutral-500 uppercase tracking-wider ml-1"
              >
                {t("contact.form.subject")}
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all text-sm"
                placeholder={t("contact.form.subject_placeholder")}
              />
            </div>

            <div className="space-y-2 mb-8">
              <label
                htmlFor="message"
                className="text-xs font-bold text-neutral-500 uppercase tracking-wider ml-1"
              >
                {t("contact.form.message")}
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all text-sm resize-none"
                placeholder={t("contact.form.message_placeholder")}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "success"}
              className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${
                status === "success"
                  ? "bg-green-500/10 border border-green-500 text-green-500"
                  : "bg-white text-black hover:bg-neutral-200"
              }`}
            >
              {status === "sending" ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>{" "}
                  {t("contact.form.sending")}
                </>
              ) : status === "success" ? (
                <>
                  <i className="fas fa-check"></i> {t("contact.form.sent")}
                </>
              ) : (
                <>
                  {t("contact.form.send")}{" "}
                  <i className="fas fa-paper-plane"></i>
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
