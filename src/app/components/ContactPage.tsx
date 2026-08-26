import { motion } from 'motion/react';
import { useState, useRef } from 'react';
import { useInView } from 'motion/react';
import { Mail, MapPin, Phone, Send, CheckCircle, XCircle } from 'lucide-react';

function ContactInfo({ icon: Icon, title, value, delay }: { icon: any; title: string; value: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-4"
    >
      <div className="p-3 bg-[#a71d31] rounded-lg">
        <Icon className="text-white" size={24} />
      </div>
      <div>
        <h3 className="font-['Jersey_10'] text-xl text-black mb-1">{title}</h3>
        <p className="font-['Jersey_10'] text-lg text-gray-700">{value}</p>
      </div>
    </motion.div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    timeline: '',
    budget: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setSubmitStatus('error');
      setErrorMessage('Something went wrong while sending your message. Please try again.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const submission = new URLSearchParams({
        access_key: accessKey,
        subject: 'New Project Inquiry - banele.dev',
        name: formData.name,
        email: formData.email,
        replyto: formData.email,
        company: formData.company,
        project_type: formData.projectType,
        timeline: formData.timeline,
        budget: formData.budget,
        message: formData.message,
        botcheck: honeypot,
      });

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
        body: submission.toString(),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error('Web3Forms request failed');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', projectType: '', timeline: '', budget: '', message: '' });
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Something went wrong while sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#e1e2ef] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-['Jersey_10'] text-4xl sm:text-5xl md:text-6xl text-black mb-4">
            Start a Project
          </h1>
          <p className="font-['Jersey_10'] text-xl sm:text-2xl text-[#a71d31]">
            Tell me what you are building and start a structured project conversation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <ContactInfo
              icon={Mail}
              title="Email"
              value="admin@banele.dev"
              delay={0.2}
            />
            <ContactInfo
              icon={MapPin}
              title="Location"
              value="East London, South Africa"
              delay={0.3}
            />
            <ContactInfo
              icon={Phone}
              title="Cell"
              value="0646877327"
              delay={0.4}
            />

            {/* Contact Image/Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hidden lg:block mt-8"
            >
              <div className="bg-white/50 rounded-lg p-8 backdrop-blur-sm">
                <h3 className="font-['Jersey_10'] text-2xl text-black mb-4">
                  Available for freelance work
                </h3>
                <p className="font-['Jersey_10'] text-lg text-gray-700">
                  I'm currently available for freelance projects and collaborations. Feel free to reach out!
                </p>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <input
              type="text"
              name="botcheck"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            {/* Success Message */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                aria-live="polite"
                className="flex items-center gap-3 p-4 bg-green-100 border-2 border-green-500 rounded-lg"
              >
                <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                <p className="font-['Jersey_10'] text-base text-green-800">
                  Inquiry received. Thanks for reaching out. I've received your project details and will review them before getting back to you.
                </p>
              </motion.div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                aria-live="assertive"
                className="flex items-start gap-3 p-4 bg-red-100 border-2 border-red-500 rounded-lg"
              >
                <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
                <p className="font-['Jersey_10'] text-base text-red-800">
                  {errorMessage}
                </p>
              </motion.div>
            )}

            <div>
              <label htmlFor="name" className="font-['Jersey_10'] text-lg text-black block mb-2">
                Name *
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white border-2 border-transparent rounded-lg font-['Jersey_10'] text-base text-black focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                animate={{
                  borderColor: focusedField === 'name' ? '#a71d31' : '#ffffff',
                  scale: focusedField === 'name' ? 1.02 : 1
                }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <div>
              <label htmlFor="email" className="font-['Jersey_10'] text-lg text-black block mb-2">
                Email *
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white border-2 border-transparent rounded-lg font-['Jersey_10'] text-base text-black focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                animate={{
                  borderColor: focusedField === 'email' ? '#a71d31' : '#ffffff',
                  scale: focusedField === 'email' ? 1.02 : 1
                }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <div>
              <label htmlFor="company" className="font-['Jersey_10'] text-lg text-black block mb-2">
                Company or organisation
              </label>
              <motion.input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white border-2 border-transparent rounded-lg font-['Jersey_10'] text-base text-black focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="projectType" className="font-['Jersey_10'] text-lg text-black block mb-2">
                Project type
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white border-2 border-transparent rounded-lg font-['Jersey_10'] text-base text-black focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select a project type</option>
                <option value="Custom website">Custom website</option>
                <option value="Web application">Web application</option>
                <option value="Portfolio or personal site">Portfolio or personal site</option>
                <option value="WordPress website">WordPress website</option>
                <option value="UI/UX design">UI/UX design</option>
                <option value="Posters and thumbnails">Posters and thumbnails</option>
              </select>
            </div>

            <div>
              <label htmlFor="timeline" className="font-['Jersey_10'] text-lg text-black block mb-2">
                Desired timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white border-2 border-transparent rounded-lg font-['Jersey_10'] text-base text-black focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select a timeline</option>
                <option value="As soon as possible">As soon as possible</option>
                <option value="Within 1-2 months">Within 1-2 months</option>
                <option value="Within 3-6 months">Within 3-6 months</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="font-['Jersey_10'] text-lg text-black block mb-2">
                Budget range
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-white border-2 border-transparent rounded-lg font-['Jersey_10'] text-base text-black focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select a budget range</option>
                <option value="To be discussed">To be discussed</option>
                <option value="R5,000 - R15,000">R5,000 - R15,000</option>
                <option value="R15,000 - R30,000">R15,000 - R30,000</option>
                <option value="R30,000+">R30,000+</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="font-['Jersey_10'] text-lg text-black block mb-2">
                Message *
              </label>
              <motion.textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
                disabled={isSubmitting}
                rows={6}
                className="w-full px-4 py-3 bg-white border-2 border-transparent rounded-lg font-['Jersey_10'] text-base text-black focus:outline-none resize-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                animate={{
                  borderColor: focusedField === 'message' ? '#a71d31' : '#ffffff',
                  scale: focusedField === 'message' ? 1.02 : 1
                }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#a71d31] text-white font-['Jersey_10'] text-xl rounded-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isSubmitting ? { scale: 1.02, backgroundColor: '#8a1727' } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              transition={{ duration: 0.2 }}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}