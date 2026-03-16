'use client'

import React, { useState } from 'react'

function Form() {
    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        
        // Professional Information
        annualIncome: '',
        employmentType: '',
        city: '',
        
        // Financial Information
        currentInvestments: '',
        taxSavingGoal: '',
        investmentExperience: '',
        
        // Preferences
        riskTolerance: '',
        investmentHorizon: '',
        primaryGoal: '',
        
        // Additional Information
        suggestions: '',
        agreeToTerms: false,
        subscribeNewsletter: false
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitMessage('')

        // Validate required fields
        if (!formData.agreeToTerms) {
            setSubmitMessage('Please agree to the terms and conditions.')
            setIsSubmitting(false)
            return
        }

        try {
            // Submit to Google Sheets via API
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const result = await response.json()

            if (result.success) {
                setSubmitMessage('🎉 Thank you for registering! Your information has been saved and we will contact you soon with personalized financial recommendations.')
                setIsSubmitted(true)
                
                // Keep the success state (don't reset automatically)
            } else {
                setSubmitMessage('❌ ' + (result.message || 'Something went wrong. Please try again.'))
            }
        } catch (error) {
            console.error('Form submission error:', error)
            setSubmitMessage('❌ Network error. Please check your connection and try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleConnectWithUs = () => {
        // You can customize this to open WhatsApp, email, or redirect to contact page
        window.open('mailto:sujalgoel19@gmail.com?subject=Finance Assistant - Let\'s Connect&body=Hi, I just registered for Zenith Finance. I\'d like to connect and learn more about your services.', '_blank')
    }

    const handleStartOver = () => {
        setIsSubmitted(false)
        setSubmitMessage('')
        setFormData({
            firstName: '', lastName: '', email: '', phone: '',
            annualIncome: '', employmentType: '', city: '',
            currentInvestments: '', taxSavingGoal: '', investmentExperience: '',
            riskTolerance: '', investmentHorizon: '', primaryGoal: '',
            suggestions: '', agreeToTerms: false, subscribeNewsletter: false
        })
    }

    return (
        <section id='register-form' className='section bg-gradient-to-br from-slate-50 to-blue-50 py-16'> 
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Join Zenith - Your Personal AI Assistant
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        Get personalized tax optimization suggestions tailored to your financial profile. 
                        Join our exclusive pre-launch community and be the first to maximize your savings.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    {isSubmitted ? (
                        // Success Notification
                        <div className="p-8 md:p-12 text-center">
                            <div className="mb-6">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                                    🎉 Registration Successful!
                                </h3>
                                <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
                                    Thank you for joining Zenith Finance! Your information has been saved securely. 
                                    Our team will review your profile and contact you soon with personalized financial recommendations.
                                </p>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                                    <p className="text-blue-800 text-sm">
                                        <strong>What's Next?</strong> Our AI will analyze your financial profile and our experts will prepare 
                                        customized investment strategies tailored to your goals and risk tolerance.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button
                                    onClick={handleConnectWithUs}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center min-w-[200px]"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                    Connect with Us
                                </button>
                                
                                <button
                                    onClick={handleStartOver}
                                    className="bg-white text-slate-600 font-medium px-6 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 hover:text-slate-700 transition-colors"
                                >
                                    Register Another User
                                </button>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-slate-200">
                                <p className="text-sm text-slate-500">
                                    Expected response time: <strong>Within 24 hours</strong> • 
                                    Email: <a href="mailto:sujalgoel19@gmail.com" className="text-blue-600 hover:underline">sujalgoel19@gmail.com</a>
                                </p>
                            </div>
                        </div>
                    ) : (
                        // Registration Form
                        <>
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                                <h3 className="text-xl font-semibold mb-2">Pre-Registration Form</h3>
                                <p className="text-blue-100">Help us understand your financial goals for personalized recommendations</p>
                            </div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-8">
                        {/* Personal Information */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                                Personal Information
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter your first name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter your last name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter your email address"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Professional Information */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                                Professional Information
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="annualIncome" className="block text-sm font-medium text-slate-700 mb-2">
                                        Annual Income (₹) *
                                    </label>
                                    <select
                                        id="annualIncome"
                                        name="annualIncome"
                                        value={formData.annualIncome}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    >
                                        <option value="">Select income range</option>
                                        <option value="below-3">Below ₹3 Lakh</option>
                                        <option value="3-5">₹3 - 5 Lakh</option>
                                        <option value="5-10">₹5 - 10 Lakh</option>
                                        <option value="10-15">₹10 - 15 Lakh</option>
                                        <option value="15-25">₹15 - 25 Lakh</option>
                                        <option value="25-50">₹25 - 50 Lakh</option>
                                        <option value="above-50">Above ₹50 Lakh</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="employmentType" className="block text-sm font-medium text-slate-700 mb-2">
                                        Employment Type *
                                    </label>
                                    <select
                                        id="employmentType"
                                        name="employmentType"
                                        value={formData.employmentType}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    >
                                        <option value="">Select employment type</option>
                                        <option value="salaried">Salaried Employee</option>
                                        <option value="self-employed">Self Employed</option>
                                        <option value="business-owner">Business Owner</option>
                                        <option value="freelancer">Freelancer</option>
                                        <option value="consultant">Consultant</option>
                                        <option value="retired">Retired</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter your city"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Financial Information */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                                Financial Profile
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="currentInvestments" className="block text-sm font-medium text-slate-700 mb-2">
                                        Current 80C Investments (₹)
                                    </label>
                                    <select
                                        id="currentInvestments"
                                        name="currentInvestments"
                                        value={formData.currentInvestments}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    >
                                        <option value="">Select investment amount</option>
                                        <option value="0">No current investments</option>
                                        <option value="25000">Up to ₹25,000</option>
                                        <option value="50000">₹25,000 - ₹50,000</option>
                                        <option value="75000">₹50,000 - ₹75,000</option>
                                        <option value="100000">₹75,000 - ₹1,00,000</option>
                                        <option value="150000">₹1,00,000 - ₹1,50,000</option>
                                        <option value="above-150000">Above ₹1,50,000</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="taxSavingGoal" className="block text-sm font-medium text-slate-700 mb-2">
                                        Tax Saving Goal (₹)
                                    </label>
                                    <select
                                        id="taxSavingGoal"
                                        name="taxSavingGoal"
                                        value={formData.taxSavingGoal}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    >
                                        <option value="">Select saving goal</option>
                                        <option value="10000">Up to ₹10,000</option>
                                        <option value="25000">₹10,000 - ₹25,000</option>
                                        <option value="50000">₹25,000 - ₹50,000</option>
                                        <option value="100000">₹50,000 - ₹1,00,000</option>
                                        <option value="above-100000">Above ₹1,00,000</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="investmentExperience" className="block text-sm font-medium text-slate-700 mb-2">
                                        Investment Experience
                                    </label>
                                    <select
                                        id="investmentExperience"
                                        name="investmentExperience"
                                        value={formData.investmentExperience}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    >
                                        <option value="">Select experience level</option>
                                        <option value="beginner">Beginner (0-1 years)</option>
                                        <option value="intermediate">Intermediate (2-5 years)</option>
                                        <option value="experienced">Experienced (5+ years)</option>
                                        <option value="expert">Expert (10+ years)</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="riskTolerance" className="block text-sm font-medium text-slate-700 mb-2">
                                        Risk Tolerance
                                    </label>
                                    <select
                                        id="riskTolerance"
                                        name="riskTolerance"
                                        value={formData.riskTolerance}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    >
                                        <option value="">Select risk tolerance</option>
                                        <option value="conservative">Conservative (Low Risk)</option>
                                        <option value="moderate">Moderate (Medium Risk)</option>
                                        <option value="aggressive">Aggressive (High Risk)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Investment Preferences */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                                Investment Preferences
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="investmentHorizon" className="block text-sm font-medium text-slate-700 mb-2">
                                        Investment Horizon
                                    </label>
                                    <select
                                        id="investmentHorizon"
                                        name="investmentHorizon"
                                        value={formData.investmentHorizon}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    >
                                        <option value="">Select time horizon</option>
                                        <option value="short">Short Term (1-3 years)</option>
                                        <option value="medium">Medium Term (3-7 years)</option>
                                        <option value="long">Long Term (7+ years)</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="primaryGoal" className="block text-sm font-medium text-slate-700 mb-2">
                                        Primary Financial Goal
                                    </label>
                                    <select
                                        id="primaryGoal"
                                        name="primaryGoal"
                                        value={formData.primaryGoal}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    >
                                        <option value="">Select primary goal</option>
                                        <option value="tax-saving">Tax Saving</option>
                                        <option value="wealth-creation">Wealth Creation</option>
                                        <option value="retirement">Retirement Planning</option>
                                        <option value="emergency-fund">Emergency Fund</option>
                                        <option value="home-buying">Home Buying</option>
                                        <option value="child-education">Child Education</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                                <span className="w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
                                Additional Information
                            </h4>
                            <div>
                                <label htmlFor="suggestions" className="block text-sm font-medium text-slate-700 mb-2">
                                    What specific tax optimization suggestions are you looking for?
                                </label>
                                <textarea
                                    id="suggestions"
                                    name="suggestions"
                                    value={formData.suggestions}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                                    placeholder="Tell us about your specific needs, questions, or goals..."
                                ></textarea>
                            </div>
                        </div>

                        {/* Checkboxes */}
                        <div className="mb-8 space-y-4">
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="agreeToTerms"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                                />
                                <label htmlFor="agreeToTerms" className="ml-3 text-sm text-slate-700">
                                    I agree to the <a href="#" className="text-blue-600 hover:text-blue-500 underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-500 underline">Privacy Policy</a> *
                                </label>
                            </div>
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id="subscribeNewsletter"
                                    name="subscribeNewsletter"
                                    checked={formData.subscribeNewsletter}
                                    onChange={handleInputChange}
                                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                                />
                                <label htmlFor="subscribeNewsletter" className="ml-3 text-sm text-slate-700">
                                    Subscribe to our newsletter for tax tips and investment updates
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting || !formData.agreeToTerms}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto min-w-[200px]"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <span>Join Pre-Launch 🚀</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Success/Error Message */}
                        {submitMessage && !isSubmitted && (
                            <div className={`mt-6 p-4 rounded-lg text-center ${
                                submitMessage.includes('Thank you') 
                                    ? 'bg-green-50 text-green-800 border border-green-200' 
                                    : 'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                                {submitMessage}
                            </div>
                        )}
                    </form>
                        </>
                    )}
                </div>

                {/* Additional Information - only show when form is visible */}
                {!isSubmitted && (
                    <div className="mt-12 text-center">
                        <div className="max-w-2xl mx-auto bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/60">
                            <h4 className="text-lg font-semibold text-slate-800 mb-3">Why Join Our Pre-Launch?</h4>
                            <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-600">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                        <span className="text-2xl">🎯</span>
                                    </div>
                                    <span className="font-medium">Personalized Recommendations</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                        <span className="text-2xl">⚡</span>
                                    </div>
                                    <span className="font-medium">Early Access</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                                        <span className="text-2xl">🎁</span>
                                    </div>
                                    <span className="font-medium">Exclusive Benefits</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>      
    )
}

export default Form
