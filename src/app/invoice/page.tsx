"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export default function InvoiceGenerator() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "INV-2024-001",
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 14 days
    clientName: "Acme Corp",
    clientEmail: "billing@acmecorp.com",
    clientAddress: "123 Business Rd\nLondon, UK\nSW1A 1AA",
    notes: "Thank you for doing business with We Digitliz. Payment is due within 14 days.",
    taxRate: 20, // UK VAT 20%
  });

  const [items, setItems] = useState<LineItem[]>([
    { id: "1", description: "Premium Web App Development", quantity: 1, rate: 3500 },
    { id: "2", description: "Advanced SEO & Copywriting", quantity: 1, rate: 500 },
  ]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDataChange = (field: string, value: string | number) => {
    setInvoiceData((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (id: string, field: keyof LineItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), description: "", quantity: 1, rate: 0 },
    ]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const taxAmount = (subtotal * invoiceData.taxRate) / 100;
  const total = subtotal + taxAmount;

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      
      {/* 
        ========================================================
        NO-PRINT AREA (DASHBOARD CONTROLS)
        ========================================================
      */}
      <div className="no-print container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#3c3c43] hover:text-[#1d1d1f] transition-colors">
            <ArrowLeft size={16} /> Back to main site
          </Link>
          <button 
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-black/5 text-[#1d1d1f] font-bold rounded-lg transition-colors shadow-[0_0_20px_rgba(0,0,0,0.2)]"
          >
            <Download size={18} /> Download PDF
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: CONTROLS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#fafafa] border border-black/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">Invoice Details</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-[#3c3c43] mb-1">Invoice #</label>
                  <input 
                    type="text" 
                    value={invoiceData.invoiceNumber} 
                    onChange={(e) => handleDataChange("invoiceNumber", e.target.value)}
                    className="w-full bg-black/5 border border-black/10 rounded-md px-3 py-2 text-sm focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#3c3c43] mb-1">Tax Rate (%)</label>
                  <input 
                    type="number" 
                    value={invoiceData.taxRate} 
                    onChange={(e) => handleDataChange("taxRate", Number(e.target.value))}
                    className="w-full bg-black/5 border border-black/10 rounded-md px-3 py-2 text-sm focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#3c3c43] mb-1">Issue Date</label>
                  <input 
                    type="date" 
                    value={invoiceData.issueDate} 
                    onChange={(e) => handleDataChange("issueDate", e.target.value)}
                    className="w-full bg-black/5 border border-black/10 rounded-md px-3 py-2 text-sm focus:border-primary outline-none transition-colors [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#3c3c43] mb-1">Due Date</label>
                  <input 
                    type="date" 
                    value={invoiceData.dueDate} 
                    onChange={(e) => handleDataChange("dueDate", e.target.value)}
                    className="w-full bg-black/5 border border-black/10 rounded-md px-3 py-2 text-sm focus:border-primary outline-none transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#fafafa] border border-black/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">Bill To</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-[#3c3c43] mb-1">Client Name / Company</label>
                  <input 
                    type="text" 
                    value={invoiceData.clientName} 
                    onChange={(e) => handleDataChange("clientName", e.target.value)}
                    className="w-full bg-black/5 border border-black/10 rounded-md px-3 py-2 text-sm focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#3c3c43] mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={invoiceData.clientEmail} 
                    onChange={(e) => handleDataChange("clientEmail", e.target.value)}
                    className="w-full bg-black/5 border border-black/10 rounded-md px-3 py-2 text-sm focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#3c3c43] mb-1">Billing Address</label>
                  <textarea 
                    value={invoiceData.clientAddress} 
                    onChange={(e) => handleDataChange("clientAddress", e.target.value)}
                    rows={3}
                    className="w-full bg-black/5 border border-black/10 rounded-md px-3 py-2 text-sm focus:border-primary outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#fafafa] border border-black/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">Line Items</h2>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id} 
                    className="grid grid-cols-12 gap-2 items-center bg-black/5 p-3 rounded-lg"
                  >
                    <div className="col-span-6">
                      <input 
                        type="text" 
                        placeholder="Description"
                        value={item.description} 
                        onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                        className="w-full bg-transparent border-b border-black/10 px-1 py-1 text-sm focus:border-primary outline-none transition-colors"
                      />
                    </div>
                    <div className="col-span-2">
                      <input 
                        type="number" 
                        placeholder="Qty"
                        value={item.quantity} 
                        onChange={(e) => handleItemChange(item.id, "quantity", Number(e.target.value))}
                        className="w-full bg-transparent border-b border-black/10 px-1 py-1 text-sm focus:border-primary outline-none transition-colors"
                      />
                    </div>
                    <div className="col-span-3">
                      <input 
                        type="number" 
                        placeholder="Rate"
                        value={item.rate} 
                        onChange={(e) => handleItemChange(item.id, "rate", Number(e.target.value))}
                        className="w-full bg-transparent border-b border-black/10 px-1 py-1 text-sm focus:border-primary outline-none transition-colors"
                      />
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button onClick={() => removeItem(item.id)} className="text-black/50 hover:text-red-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button 
                onClick={addItem}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 border border-dashed border-black/20 rounded-lg text-[#3c3c43] hover:text-[#1d1d1f] hover:bg-black/5 transition-all text-sm font-medium"
              >
                <Plus size={16} /> Add Item
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: LIVE PREVIEW & PRINT TARGET */}
          <div className="lg:col-span-7">
            <div className="sticky top-8 bg-[#ffffff] rounded-3xl p-4 md:p-8 border border-black/5 shadow-2xl">
              <h3 className="text-black/50 text-xs font-bold tracking-widest uppercase mb-4">Live A4 Preview</h3>
              
              {/* THE ACTUAL INVOICE TEMPLATE */}
              <div 
                className="print-area bg-white text-black w-full min-h-[842px] max-w-[595px] mx-auto p-8 shadow-sm origin-top"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                
                {/* Header */}
                <div className="flex justify-between items-start mb-12">
                  <div>
                    {/* Placeholder Logo / Brand Name */}
                    <div className="text-2xl font-bold tracking-tighter" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      WE <span style={{ color: "#0066cc" }}>DIGITLIZ</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">Digital Transformation Agency</p>
                  </div>
                  <div className="text-right">
                    <h1 className="text-4xl font-light text-gray-200 uppercase tracking-widest mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Invoice</h1>
                    <p className="font-bold text-gray-800">{invoiceData.invoiceNumber}</p>
                  </div>
                </div>

                {/* Details Row */}
                <div className="flex justify-between border-t border-b border-gray-100 py-6 mb-12">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Billed To</h4>
                    <p className="font-bold text-gray-800">{invoiceData.clientName}</p>
                    <p className="text-gray-500 text-sm">{invoiceData.clientEmail}</p>
                    <p className="text-gray-500 text-sm whitespace-pre-wrap mt-1">{invoiceData.clientAddress}</p>
                  </div>
                  <div className="text-right flex flex-col gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Issue Date</h4>
                      <p className="font-medium text-gray-800">{new Date(invoiceData.issueDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Due Date</h4>
                      <p className="font-medium text-gray-800">{new Date(invoiceData.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Line Items Table */}
                <table className="w-full mb-12">
                  <thead>
                    <tr className="border-b-2 border-gray-800">
                      <th className="text-left py-3 text-sm font-bold text-gray-800">Description</th>
                      <th className="text-right py-3 text-sm font-bold text-gray-800">Qty</th>
                      <th className="text-right py-3 text-sm font-bold text-gray-800">Rate</th>
                      <th className="text-right py-3 text-sm font-bold text-gray-800">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-4 text-sm text-gray-800">{item.description || "—"}</td>
                        <td className="text-right py-4 text-sm text-gray-600">{item.quantity}</td>
                        <td className="text-right py-4 text-sm text-gray-600">£{item.rate.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                        <td className="text-right py-4 text-sm font-medium text-gray-800">£{(item.quantity * item.rate).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end mb-12">
                  <div className="w-1/2">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Subtotal</span>
                      <span className="text-sm font-medium text-gray-800">£{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">Tax ({invoiceData.taxRate}%)</span>
                      <span className="text-sm font-medium text-gray-800">£{taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between py-4">
                      <span className="text-base font-bold text-gray-800 uppercase tracking-wider">Total Due</span>
                      <span className="text-xl font-bold text-gray-900">£{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Notes */}
                <div className="mt-20 border-t border-gray-100 pt-6">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Notes</h4>
                  <p className="text-sm text-gray-500">{invoiceData.notes}</p>
                </div>
                
                {/* Brand Footprint */}
                <div className="mt-12 text-center text-xs text-gray-300">
                  Generated by We Digitliz Professional Invoicing
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
