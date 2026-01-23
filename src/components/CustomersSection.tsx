export default function CustomersSection() {
  return (
    <section className="section-padding bg-section-primary">
      <div className="container-responsive">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 mb-6">
            Trusted by industry leaders worldwide
          </h2>
          <p className="body-large max-w-2xl mx-auto">
            From startups to Fortune 500s, businesses trust Cognia AI to transform their customer communications.
          </p>
        </div>

        {/* Logos Grid */}
        <div className="bento-card no-hover-movement">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4">
            {[
              { name: "Stripe", icon: "/stripe-logo-icon.jpg" },
              { name: "Amazon", icon: "/amazon-logo.svg" },
              { name: "Slack", icon: "/slack-logo-icon.jpg" },
              { name: "Notion", icon: "/notion-logo-icon.jpg" },
              { name: "Vercel", icon: "/vercel-triangle-logo.jpg" },
              { name: "Figma", icon: "/figma-logo-icon.jpg" },
              { name: "GitHub", icon: "/github-logo-icon.jpg" },
              { name: "Discord", icon: "/discord-logo-icon.jpg" },
            ].map((company, index) => (
              <div
                key={index}
                className="flex items-center justify-center py-6 group"
              >
                <div className="w-full max-w-[120px] flex items-center justify-center opacity-50 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110">
                  <img
                    src={company.icon}
                    alt={company.name}
                    className="w-full h-auto object-contain max-h-10"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.insertAdjacentHTML('beforeend', `<span class="text-sm font-bold opacity-50 font-serif">${company.name}</span>`);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
