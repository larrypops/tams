'use client';

import { motion } from 'motion/react';
import { Phone, Mail, MapPin, MessageCircle, Send, Clock, Globe } from 'lucide-react';
import { CONTACT_INFO } from '@/src/constants';
import React, { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to a backend
    alert('Merci ! Votre message a été envoyé. Nous vous contacterons sous peu.');
    setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-display font-extrabold mb-6">Contactez <span className="text-brand-gold">Nos Experts</span></h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Besoin d'un devis, d'une information technique ou d'une visite de stock ? Nous sommes à votre entière disposition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-brand-navy text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-brand-gold rounded-xl flex items-center justify-center mb-6">
                  <Phone size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Téléphones</h3>
                <p className="text-gray-400 mb-2">Appelez-nous directement :</p>
                <div className="space-y-1 font-bold text-lg">
                  <a href={`tel:${CONTACT_INFO.phone1.replace(/\s+/g, '')}`} className="block hover:text-brand-gold transition-colors">{CONTACT_INFO.phone1}</a>
                  <a href={`tel:${CONTACT_INFO.phone2.replace(/\s+/g, '')}`} className="block hover:text-brand-gold transition-colors">{CONTACT_INFO.phone2}</a>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl group-hover:bg-brand-gold/20 transition-colors" />
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 group">
              <div className="w-12 h-12 bg-yellow-50 text-brand-gold rounded-xl flex items-center justify-center mb-6">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">Email</h3>
              <p className="text-gray-500 mb-2">Écrivez-nous à :</p>
              <a href={`mailto:${CONTACT_INFO.email}`} className="font-bold text-brand-navy hover:text-brand-gold transition-colors break-all">
                {CONTACT_INFO.email}
              </a>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 group">
              <div className="w-12 h-12 bg-yellow-50 text-brand-gold rounded-xl flex items-center justify-center mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">Localisation</h3>
              <p className="text-gray-500 mb-2">Nos bureaux :</p>
              <p className="font-bold text-brand-navy">{CONTACT_INFO.address}</p>
            </div>

            <div className="bg-[#25D366] text-white p-8 rounded-[2rem] shadow-xl flex items-center justify-between group cursor-pointer" onClick={() => window.open(`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\s+/g, '')}`, '_blank')}>
              <div>
                <h3 className="text-xl font-bold mb-1">WhatsApp</h3>
                <p className="opacity-90">Réponse instantanée</p>
              </div>
              <MessageCircle size={40} className="group-hover:scale-110 transition-transform" />
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-50">
              <h3 className="text-3xl font-display font-bold text-brand-navy mb-8">Envoyez-nous un message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Nom Complet</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                      placeholder="Votre nom..."
                      value={formState.name}
                      onChange={e => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Email</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                      placeholder="votre@email.com"
                      value={formState.email}
                      onChange={e => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Téléphone</label>
                    <input 
                      type="tel" 
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
                      placeholder="+237 ..."
                      value={formState.phone}
                      onChange={e => setFormState({...formState, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Sujet</label>
                    <select 
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all appearance-none"
                      value={formState.subject}
                      onChange={e => setFormState({...formState, subject: e.target.value})}
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="devis">Demande de devis</option>
                      <option value="info">Information technique</option>
                      <option value="stock">Disponibilité stock</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Message</label>
                  <textarea 
                    required
                    rows={5}
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all resize-none"
                    placeholder="Comment pouvons-nous vous aider ?"
                    value={formState.message}
                    onChange={e => setFormState({...formState, message: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-gold text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-yellow-600 transition-all shadow-xl shadow-yellow-200"
                >
                  <Send size={20} />
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Clock className="text-brand-gold" size={32} />
            <div>
              <p className="font-bold text-brand-navy">Lundi - Vendredi</p>
              <p className="text-sm text-gray-500">08:00 - 18:00</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Clock className="text-brand-gold" size={32} />
            <div>
              <p className="font-bold text-brand-navy">Samedi</p>
              <p className="text-sm text-gray-500">09:00 - 14:00</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Globe className="text-brand-gold" size={32} />
            <div>
              <p className="font-bold text-brand-navy">Service Client</p>
              <p className="text-sm text-gray-500">Disponible 24/7 via WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
