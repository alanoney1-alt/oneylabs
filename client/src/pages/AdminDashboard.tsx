import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Users, Calendar, MessageSquare, Star, FileText, TrendingUp, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

type Tab = "overview" | "leads" | "bookings" | "testimonials" | "blog" | "reviews";

export default function AdminDashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-lime" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <Card className="bg-[#1A1A1A] border-white/10 p-8 text-center max-w-md">
          <h2 className="font-heading font-800 text-white text-2xl mb-4">Admin Access Required</h2>
          <p className="text-white/60 mb-6">Please log in to access the admin dashboard.</p>
          <a href={getLoginUrl()}>
            <Button className="bg-lime text-black hover:bg-lime/90 font-heading font-700">Log In</Button>
          </a>
        </Card>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "leads", label: "Leads", icon: Users },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "reviews", label: "Reviews", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-[#111111]">
      {/* Header */}
      <div className="bg-[#0D0D0D] border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-lime/20 rounded-lg flex items-center justify-center">
              <TrendingUp size={16} className="text-lime" />
            </div>
            <h1 className="font-heading font-800 text-white text-lg">Oney Labs Admin</h1>
          </div>
          <p className="text-white/40 text-sm">Welcome, {user?.name || "Admin"}</p>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-56 bg-[#0D0D0D] border-r border-white/10 min-h-[calc(100vh-64px)] p-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-heading font-600 mb-1 transition-all ${
                activeTab === tab.id ? "bg-lime/10 text-lime" : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && <OverviewPanel />}
          {activeTab === "leads" && <LeadsPanel />}
          {activeTab === "bookings" && <BookingsPanel />}
          {activeTab === "testimonials" && <TestimonialsPanel />}
          {activeTab === "blog" && <BlogPanel />}
          {activeTab === "reviews" && <ReviewsPanel />}
        </main>
      </div>
    </div>
  );
}

function OverviewPanel() {
  const { data: leads } = trpc.leads.list.useQuery();
  const { data: bookings } = trpc.bookings.list.useQuery();
  const { data: testimonials } = trpc.testimonials.list.useQuery();
  const { data: posts } = trpc.blog.list.useQuery();
  const { data: reviews } = trpc.reviews.list.useQuery();

  const stats = [
    { label: "Total Leads", value: leads?.length || 0, icon: Users, color: "text-lime" },
    { label: "Bookings", value: bookings?.length || 0, icon: Calendar, color: "text-blue-400" },
    { label: "Testimonials", value: testimonials?.length || 0, icon: MessageSquare, color: "text-orange-400" },
    { label: "Blog Posts", value: posts?.length || 0, icon: FileText, color: "text-purple-400" },
    { label: "Reviews", value: reviews?.length || 0, icon: Star, color: "text-yellow-400" },
  ];

  return (
    <div>
      <h2 className="font-heading font-800 text-white text-2xl mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-[#1A1A1A] border-white/10 p-4">
            <stat.icon size={20} className={stat.color} />
            <p className="font-display text-3xl text-white mt-2">{stat.value}</p>
            <p className="text-white/40 text-xs font-heading">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Recent leads */}
      <h3 className="font-heading font-700 text-white text-lg mb-4">Recent Leads</h3>
      <div className="bg-[#1A1A1A] border border-white/10 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/40 text-xs font-heading p-3">Name</th>
              <th className="text-left text-white/40 text-xs font-heading p-3">Email</th>
              <th className="text-left text-white/40 text-xs font-heading p-3">Source</th>
              <th className="text-left text-white/40 text-xs font-heading p-3">Status</th>
              <th className="text-left text-white/40 text-xs font-heading p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads?.slice(0, 10).map((lead) => (
              <tr key={lead.id} className="border-b border-white/5">
                <td className="text-white text-sm p-3">{lead.name || "N/A"}</td>
                <td className="text-white/60 text-sm p-3">{lead.email}</td>
                <td className="p-3"><span className="text-lime text-xs bg-lime/10 px-2 py-0.5 rounded">{lead.source}</span></td>
                <td className="p-3"><span className="text-white/60 text-xs">{lead.status}</span></td>
                <td className="text-white/40 text-xs p-3">{new Date(lead.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!leads || leads.length === 0) && (
          <p className="text-white/30 text-sm text-center py-8">No leads yet</p>
        )}
      </div>
    </div>
  );
}

function LeadsPanel() {
  const { data: leads, isLoading } = trpc.leads.list.useQuery();
  const utils = trpc.useUtils();
  const updateStatus = trpc.leads.updateStatus.useMutation({
    onSuccess: () => { utils.leads.list.invalidate(); toast.success("Lead status updated"); },
  });

  if (isLoading) return <Loader2 className="animate-spin text-lime" />;

  return (
    <div>
      <h2 className="font-heading font-800 text-white text-2xl mb-6">Leads ({leads?.length || 0})</h2>
      <div className="bg-[#1A1A1A] border border-white/10 rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/40 text-xs font-heading p-3">Name</th>
              <th className="text-left text-white/40 text-xs font-heading p-3">Email</th>
              <th className="text-left text-white/40 text-xs font-heading p-3">Business</th>
              <th className="text-left text-white/40 text-xs font-heading p-3">Source</th>
              <th className="text-left text-white/40 text-xs font-heading p-3">Score</th>
              <th className="text-left text-white/40 text-xs font-heading p-3">Status</th>
              <th className="text-left text-white/40 text-xs font-heading p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads?.map((lead) => (
              <tr key={lead.id} className="border-b border-white/5">
                <td className="text-white text-sm p-3">{lead.name || "N/A"}</td>
                <td className="text-white/60 text-sm p-3">{lead.email}</td>
                <td className="text-white/60 text-sm p-3">{lead.businessName || "N/A"}</td>
                <td className="p-3"><span className="text-lime text-xs bg-lime/10 px-2 py-0.5 rounded">{lead.source}</span></td>
                <td className="text-white/60 text-sm p-3">{lead.visibilityScore ?? "N/A"}</td>
                <td className="p-3">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus.mutate({ id: lead.id, status: e.target.value as any })}
                    className="bg-white/5 border border-white/10 text-white text-xs rounded px-2 py-1"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                    <option value="lost">Lost</option>
                  </select>
                </td>
                <td className="text-white/40 text-xs p-3">{new Date(lead.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BookingsPanel() {
  const { data: bookings, isLoading } = trpc.bookings.list.useQuery();
  const utils = trpc.useUtils();
  const updateStatus = trpc.bookings.updateStatus.useMutation({
    onSuccess: () => { utils.bookings.list.invalidate(); toast.success("Booking status updated"); },
  });

  if (isLoading) return <Loader2 className="animate-spin text-lime" />;

  return (
    <div>
      <h2 className="font-heading font-800 text-white text-2xl mb-6">Bookings ({bookings?.length || 0})</h2>
      <div className="bg-[#1A1A1A] border border-white/10 rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/40 text-xs font-heading p-3">Name</th>
              <th className="text-left text-white/40 text-xs font-heading p-3">Service</th>
              <th className="text-left text-white/40 text-xs font-heading p-3">Date</th>
              <th className="text-left text-white/40 text-xs font-heading p-3">Time</th>
              <th className="text-left text-white/40 text-xs font-heading p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((b) => (
              <tr key={b.id} className="border-b border-white/5">
                <td className="text-white text-sm p-3">{b.name}</td>
                <td className="text-white/60 text-sm p-3">{b.serviceType}</td>
                <td className="text-white/60 text-sm p-3">{b.preferredDate}</td>
                <td className="text-white/60 text-sm p-3">{b.preferredTime}</td>
                <td className="p-3">
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus.mutate({ id: b.id, status: e.target.value as any })}
                    className="bg-white/5 border border-white/10 text-white text-xs rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TestimonialsPanel() {
  const { data: testimonials, isLoading } = trpc.testimonials.list.useQuery();
  const utils = trpc.useUtils();
  const createMutation = trpc.testimonials.create.useMutation({
    onSuccess: () => { utils.testimonials.list.invalidate(); toast.success("Testimonial added"); setShowForm(false); },
  });
  const deleteMutation = trpc.testimonials.delete.useMutation({
    onSuccess: () => { utils.testimonials.list.invalidate(); toast.success("Testimonial deleted"); },
  });

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ clientName: "", businessName: "", quote: "", rating: 5, beforeMetric: "", afterMetric: "" });

  if (isLoading) return <Loader2 className="animate-spin text-lime" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-800 text-white text-2xl">Testimonials ({testimonials?.length || 0})</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-lime text-black hover:bg-lime/90 font-heading font-700 text-sm">
          <Plus size={16} className="mr-1" /> Add Testimonial
        </Button>
      </div>

      {showForm && (
        <Card className="bg-[#1A1A1A] border-white/10 p-4 mb-6">
          <form onSubmit={(e) => { e.preventDefault(); createMutation.mutate(form); }} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Client name" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} required className="bg-white/5 border-white/10 text-white" />
              <Input placeholder="Business name" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} className="bg-white/5 border-white/10 text-white" />
            </div>
            <textarea placeholder="Quote / testimonial text" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} required rows={3} className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm" />
            <div className="grid grid-cols-3 gap-3">
              <Input type="number" min={1} max={5} placeholder="Rating (1-5)" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })} className="bg-white/5 border-white/10 text-white" />
              <Input placeholder="Before metric" value={form.beforeMetric} onChange={(e) => setForm({ ...form, beforeMetric: e.target.value })} className="bg-white/5 border-white/10 text-white" />
              <Input placeholder="After metric" value={form.afterMetric} onChange={(e) => setForm({ ...form, afterMetric: e.target.value })} className="bg-white/5 border-white/10 text-white" />
            </div>
            <Button type="submit" disabled={createMutation.isPending} className="bg-lime text-black hover:bg-lime/90">
              {createMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : "Save"}
            </Button>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {testimonials?.map((t) => (
          <Card key={t.id} className="bg-[#1A1A1A] border-white/10 p-4 flex items-start justify-between">
            <div>
              <p className="text-white font-heading font-700 text-sm">{t.clientName} {t.businessName ? `(${t.businessName})` : ""}</p>
              <p className="text-white/60 text-sm mt-1 italic">"{t.quote}"</p>
              <div className="flex gap-2 mt-2">
                <span className={`text-xs px-2 py-0.5 rounded ${t.published ? "bg-lime/10 text-lime" : "bg-white/10 text-white/40"}`}>
                  {t.published ? "Published" : "Draft"}
                </span>
                {t.featured && <span className="text-xs px-2 py-0.5 rounded bg-orange-400/10 text-orange-400">Featured</span>}
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => deleteMutation.mutate({ id: t.id })} className="border-red-400/30 text-red-400 hover:bg-red-400/10">
              <Trash2 size={14} />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BlogPanel() {
  const { data: posts, isLoading } = trpc.blog.list.useQuery();
  const utils = trpc.useUtils();
  const createMutation = trpc.blog.create.useMutation({
    onSuccess: () => { utils.blog.list.invalidate(); toast.success("Post created"); setShowForm(false); },
  });
  const deleteMutation = trpc.blog.delete.useMutation({
    onSuccess: () => { utils.blog.list.invalidate(); toast.success("Post deleted"); },
  });
  const updateMutation = trpc.blog.update.useMutation({
    onSuccess: () => { utils.blog.list.invalidate(); toast.success("Post updated"); },
  });

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ slug: "", title: "", excerpt: "", content: "", tags: "", status: "draft" as const });

  if (isLoading) return <Loader2 className="animate-spin text-lime" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-800 text-white text-2xl">Blog Posts ({posts?.length || 0})</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-lime text-black hover:bg-lime/90 font-heading font-700 text-sm">
          <Plus size={16} className="mr-1" /> New Post
        </Button>
      </div>

      {showForm && (
        <Card className="bg-[#1A1A1A] border-white/10 p-4 mb-6">
          <form onSubmit={(e) => { e.preventDefault(); createMutation.mutate(form); }} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") })} required className="bg-white/5 border-white/10 text-white" />
              <Input placeholder="Slug (auto-generated)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required className="bg-white/5 border-white/10 text-white" />
            </div>
            <Input placeholder="Excerpt (short description)" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="bg-white/5 border-white/10 text-white" />
            <textarea placeholder="Content (Markdown supported)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required rows={10} className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm font-mono" />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Tags (comma-separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="bg-white/5 border-white/10 text-white" />
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })} className="bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <Button type="submit" disabled={createMutation.isPending} className="bg-lime text-black hover:bg-lime/90">
              {createMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : "Create Post"}
            </Button>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {posts?.map((post) => (
          <Card key={post.id} className="bg-[#1A1A1A] border-white/10 p-4 flex items-start justify-between">
            <div>
              <p className="text-white font-heading font-700 text-sm">{post.title}</p>
              <p className="text-white/40 text-xs mt-1">/{post.slug}</p>
              <div className="flex gap-2 mt-2">
                <span className={`text-xs px-2 py-0.5 rounded ${post.status === "published" ? "bg-lime/10 text-lime" : "bg-white/10 text-white/40"}`}>
                  {post.status}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateMutation.mutate({ id: post.id, status: post.status === "published" ? "draft" : "published" })}
                className="border-white/20 text-white/60 hover:bg-white/5"
              >
                {post.status === "published" ? <EyeOff size={14} /> : <Eye size={14} />}
              </Button>
              <Button variant="outline" size="sm" onClick={() => deleteMutation.mutate({ id: post.id })} className="border-red-400/30 text-red-400 hover:bg-red-400/10">
                <Trash2 size={14} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ReviewsPanel() {
  const { data: reviews, isLoading } = trpc.reviews.list.useQuery();
  const utils = trpc.useUtils();
  const createMutation = trpc.reviews.create.useMutation({
    onSuccess: () => { utils.reviews.list.invalidate(); toast.success("Review added"); setShowForm(false); },
  });
  const deleteMutation = trpc.reviews.delete.useMutation({
    onSuccess: () => { utils.reviews.list.invalidate(); toast.success("Review deleted"); },
  });

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ reviewerName: "", rating: 5, text: "", source: "google", reviewDate: "" });

  if (isLoading) return <Loader2 className="animate-spin text-lime" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-800 text-white text-2xl">Reviews ({reviews?.length || 0})</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-lime text-black hover:bg-lime/90 font-heading font-700 text-sm">
          <Plus size={16} className="mr-1" /> Add Review
        </Button>
      </div>

      {showForm && (
        <Card className="bg-[#1A1A1A] border-white/10 p-4 mb-6">
          <form onSubmit={(e) => { e.preventDefault(); createMutation.mutate(form); }} className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <Input placeholder="Reviewer name" value={form.reviewerName} onChange={(e) => setForm({ ...form, reviewerName: e.target.value })} required className="bg-white/5 border-white/10 text-white" />
              <Input type="number" min={1} max={5} placeholder="Rating" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })} className="bg-white/5 border-white/10 text-white" />
              <Input placeholder="Source (google, yelp)" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className="bg-white/5 border-white/10 text-white" />
            </div>
            <textarea placeholder="Review text" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={3} className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 text-sm" />
            <Button type="submit" disabled={createMutation.isPending} className="bg-lime text-black hover:bg-lime/90">
              {createMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : "Save Review"}
            </Button>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {reviews?.map((r) => (
          <Card key={r.id} className="bg-[#1A1A1A] border-white/10 p-4 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-white font-heading font-700 text-sm">{r.reviewerName}</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={10} className={i < r.rating ? "text-lime fill-lime" : "text-white/20"} />
                  ))}
                </div>
              </div>
              {r.text && <p className="text-white/60 text-sm mt-1">"{r.text}"</p>}
              <span className="text-xs text-white/30 mt-1">{r.source}</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => deleteMutation.mutate({ id: r.id })} className="border-red-400/30 text-red-400 hover:bg-red-400/10">
              <Trash2 size={14} />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
