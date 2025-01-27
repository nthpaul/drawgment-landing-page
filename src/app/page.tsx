"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Brush, Leaf, Palette } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubscribed, setHasSubscribed] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            setHasSubscribed(true);
        } catch (error) {
            console.error('Error:', error);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-stone-900 font-space-grotesk relative overflow-hidden">
            {/* Animated background */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    background: `radial-gradient(
            circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(110, 231, 183, 0.1) 0%,
            rgba(45, 212, 191, 0) 20%
          )`,
                    transition: 'background 0.3s ease-out',
                }}
            />
            <main className="container mx-auto px-4 py-28 max-w-3xl">
                <div className="text-center space-y-8">
                    <div className="inline-flex items-center gap-3 text-emerald-400 px-6 py-2 rounded-full mb-8">
                        <span className="text-5xl font-medium">Drawgment</span>
                    </div>

                    <h1 className="text-5xl font-bold text-stone-100 leading-[1.15]">
                        Your art deserves a <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">thoughtful</span> companion
                    </h1>

                    <p className="text-xl text-stone-400 mt-6 max-w-2xl mx-auto leading-relaxed">
                        Overcome creative blocks with AI suggestions that respect your craft. No data harvesting, no style theft.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-12 space-y-4">
                        <div className="flex flex-col items-center gap-4">
                            {!hasSubscribed && (
                                <Input
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="text-center w-full max-w-sm bg-stone-800 border-stone-700 rounded-xl text-stone-100 placeholder:text-stone-500 focus:ring-emerald-400"
                                    required
                                />
                            )}

                            <Button
                                size="lg"
                                type="submit"
                                disabled={isSubmitting || hasSubscribed}
                                className={`${hasSubscribed
                                    ? 'bg-emerald-400/10 text-emerald-400 cursor-not-allowed'
                                    : 'bg-emerald-400 hover:bg-emerald-500 text-stone-900 shadow-lg shadow-emerald-400/20'
                                    } transition-all rounded-xl`}
                            >
                                {isSubmitting ? (
                                    'Joining...'
                                ) : hasSubscribed ? (
                                    <>
                                        <Leaf className="w-5 h-5 mr-2" />
                                        {`You're on the list! 🎉`}
                                    </>
                                ) : (
                                    'Join waitlist'
                                )}
                            </Button>
                        </div>

                        {!hasSubscribed && (
                            <p className="text-sm text-stone-500 mt-4">
                                1,843 artists already waiting
                            </p>
                        )}
                    </form>
                </div>

                {/* Visual Divider */}
                <div className="mt-24 flex justify-center items-center gap-6 text-stone-600">
                    <div className="h-px bg-stone-800 w-24" />
                    <Palette className="w-5 h-5" />
                    <div className="h-px bg-stone-800 w-24" />
                </div>

                {/* Value Pillars */}
                <div className="mt-24 grid md:grid-cols-3 gap-8 text-center">
                    {[
                        { icon: Brush, title: "Inspire, Don't Automate", text: "Suggestions that spark ideas, not replace them" },
                        { icon: Leaf, title: "Ethical by Design", text: "Your work never trains public models" },
                        { icon: Palette, title: "Creative Control", text: "Granular settings for every tool" },
                    ].map((item, i) => (
                        <div key={i} className="space-y-4 p-6 rounded-xl hover:bg-stone-800 transition-all">
                            <item.icon className="w-8 h-8 text-emerald-400 mx-auto" />
                            <h3 className="text-lg font-semibold text-stone-100">{item.title}</h3>
                            <p className="text-stone-400 text-sm leading-relaxed">{item.text}</p>
                        </div>
                    ))}
                </div>
            </main>

            {/* Minimal Footer */}
            <footer className="border-t border-stone-800 mt-32">
                <div className="container mx-auto px-4 py-8 text-center text-stone-500 text-sm">
                    <p>For artists who care about their craft</p>
                </div>
            </footer>
        </div>
    );
}
