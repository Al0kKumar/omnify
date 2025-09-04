import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Eye, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface Blog {
  id: string;
  title: string;
  content: string;
}

const EditBlog = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
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
      setFormData({ title: res.data.title, content: res.data.content });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to load blog post.",
        variant: "destructive",
      });
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Error",
        description: "Title and content cannot be empty.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Unauthorized');

      await axios.patch(`http://localhost:8080/api/blogs/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: "Blog updated!",
        description: "Your blog post has been successfully updated.",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update blog.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getExcerpt = (content: string) => {
    return content.substring(0, 150) + (content.length > 150 ? '...' : '');
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  if (isLoading) return <LoadingSpinner />;
  if (!blog) return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
        <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 fade-in">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-3xl font-bold">Edit Post</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                className="btn-primary"
                onClick={handleSubmit}
                disabled={isSaving}
              >
                <Eye className="h-4 w-4 mr-2" />
                Update
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Editor */}
            <div className="lg:col-span-2 space-y-6 slide-up">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Your Story</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter your blog title..."
                      value={formData.title}
                      onChange={handleChange}
                      className="text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="Start writing your story..."
                      value={formData.content}
                      onChange={handleChange}
                      className="min-h-[400px] resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <div className="space-y-6 slide-up" style={{ animationDelay: '0.2s' }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {formData.title && (
                      <h3 className="text-xl font-semibold">{formData.title}</h3>
                    )}
                    {formData.content && (
                      <p className="text-muted-foreground text-sm">
                        {getExcerpt(formData.content)}
                      </p>
                    )}
                    {formData.content && (
                      <span className="text-sm text-muted-foreground">
                        {getReadTime(formData.content)} min read
                      </span>
                    )}
                    <p className="text-xs text-muted-foreground">Last updated just now</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
