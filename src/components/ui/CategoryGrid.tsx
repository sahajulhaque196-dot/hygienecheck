import React from 'react';
import Link from 'next/link';
import { Utensils, Pizza, Beer, Baby, Building, ShoppingBag, ArrowRight } from 'lucide-react';

export const CategoryGrid = () => {
  const categories = [
    {
      title: 'Takeaways & Fast Food',
      count: '112,400+ venues',
      icon: Pizza,
      color: 'from-amber-500/20 to-orange-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      slug: 'takeaways',
      desc: 'Fish & chips, pizza, burgers, curry houses, and kebab shops.',
    },
    {
      title: 'Restaurants & Cafes',
      count: '185,200+ venues',
      icon: Utensils,
      color: 'from-emerald-500/20 to-teal-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      slug: 'restaurants',
      desc: 'Dine-in restaurants, bistros, coffee shops, and canteens.',
    },
    {
      title: 'Pubs, Bars & Nightclubs',
      count: '48,600+ venues',
      icon: Beer,
      color: 'from-yellow-500/20 to-amber-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      slug: 'pubs',
      desc: 'Traditional pubs, gastro pubs, cocktail bars, and taprooms.',
    },
    {
      title: 'Schools & Nurseries',
      count: '34,800+ venues',
      icon: Baby,
      color: 'from-cyan-500/20 to-blue-500/10',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      slug: 'schools',
      desc: 'Day nurseries, primary schools, college kitchens, and academies.',
    },
    {
      title: 'Care Homes & Hospitals',
      count: '28,100+ venues',
      icon: Building,
      color: 'from-teal-500/20 to-emerald-500/10',
      border: 'border-teal-500/30',
      text: 'text-teal-400',
      slug: 'care-homes',
      desc: 'Residential care homes, nursing facilities, and hospital canteens.',
    },
    {
      title: 'Supermarkets & Stores',
      count: '78,900+ venues',
      icon: ShoppingBag,
      color: 'from-indigo-500/20 to-purple-500/10',
      border: 'border-indigo-500/30',
      text: 'text-indigo-400',
      slug: 'supermarkets',
      desc: 'Grocery stores, butchers, bakers, and convenience shops.',
    },
  ];

  return (
    <section className="py-10 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            Official FSA Business Categories
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Browse Food Places by Category
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mt-2 md:mt-0 max-w-md">
          Every food place in the UK is categorized under official government inspection groups. Select a category to explore ratings.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <Link
              key={idx}
              href="/authority"
              className={`p-6 rounded-2xl bg-[#0F172A]/70 border ${cat.border} hover:bg-gray-900/90 transition-all duration-300 group flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.color} ${cat.text}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-medium text-gray-400">
                    {cat.count}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-gray-800/80 flex items-center justify-between text-xs font-semibold text-gray-300 group-hover:text-emerald-400">
                <span>Explore Ratings</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
