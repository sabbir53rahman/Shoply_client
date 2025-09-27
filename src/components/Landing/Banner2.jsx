"use client"
import { ArrowRight, CheckCircle, Leaf } from 'lucide-react/dist/cjs/lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import vagetable from "@/assets/vagetable.jpg";

const Banner2 = () => {
  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-200 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-teal-200 rounded-full blur-xl"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 mb-4">
                  <Leaf className="w-4 h-4 mr-2" />
                  About Shoply
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Fresh, Organic &
                  <span className="text-emerald-600"> Sustainable</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  We&apos;re passionate about bringing you the freshest organic
                  produce while supporting sustainable farming practices and
                  local communities.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl">
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-xl"
                >
                  Our Story
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={vagetable}
                  alt="Fresh organic vegetables"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Certified Organic
                    </p>
                    <p className="text-sm text-gray-600">
                      100% Natural Products
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Banner2;