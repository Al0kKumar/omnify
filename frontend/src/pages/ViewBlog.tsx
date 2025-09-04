import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    email: string;
  };
}

const ViewBlog = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  useEffect(() => {
    if (id) loadBlog();
  }, [id]);

  const loadBlog = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Unauthorized');

      const res = await axios.get(`http://localhost:8080/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBlog(res.data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to load blog post.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('## ')) return <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">{line.substring(3)}</h2>;
      if (line.startsWith('### ')) return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{line.substring(4)}</h3>;
      if (line.trim() === '') return <div key={index} className="h-4"></div>;
      if (line.startsWith('- ')) return <li key={index} className="ml-6 mb-1">{line.substring(2)}</li>;
      if (/^\d+\./.test(line.trim())) {
        const match = line.match(/^(\d+\.\s*)(.*)/);
        if (match) return <li key={index} className="ml-6 mb-1"><strong>{match[1]}</strong>{match[2]}</li>;
      }
      return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
    });
  };

  if (isLoading) return <LoadingSpinner />;

  if (!blog) return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="mb-8 fade-in">
            <Button variant="ghost" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <Card className="mb-8 slide-up">
            <CardContent className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

              <div className="flex items-center text-muted-foreground text-sm space-x-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {blog.author.name}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(blog.createdAt)}
                </div>
                {blog.updatedAt !== blog.createdAt && (
                  <div className="text-xs">
                    Updated {formatDate(blog.updatedAt)}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Article Content */}
          <Card className="slide-up" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-8">
              <div className="prose max-w-none">
                {formatContent(blog.content)}
              </div>
            </CardContent>
          </Card>

          {/* Article Footer */}
          <div className="mt-8 text-center slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="inline-flex items-center space-x-2 text-muted-foreground">
              <span>•</span>
              <span>•</span>
              <span>•</span>
            </div>
            <p className="mt-4 text-muted-foreground">
              Thank you for reading! If you enjoyed this article, consider sharing it with others.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
