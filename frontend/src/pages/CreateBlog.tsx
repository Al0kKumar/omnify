import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { api } from '@/utils/api';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your blog post.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.content.trim()) {
      toast({
        title: "Error",
        description: "Please write some content for your blog post.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Unauthorized');

      await api.post('/blogs', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "Blog created!",
        description: "Your blog post has been successfully created.",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create your blog. Try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
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
              <h1 className="text-3xl font-bold">Create New Post</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                className="btn-primary"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                <Eye className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Editor */}
            <div className="lg:col-span-2 space-y-6 slide-up">
              <Card>
                <CardHeader>
                  <CardTitle>Write Your Story</CardTitle>
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
                  {formData.title || formData.content ? (
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

                      <p className="text-xs text-muted-foreground">
                        Created just now
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      Start writing to see a preview of your blog post...
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Publishing Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium">Engaging Title</h4>
                    <p className="text-muted-foreground">Make it clear and compelling</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Strong Opening</h4>
                    <p className="text-muted-foreground">Hook readers from the first paragraph</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Clear Structure</h4>
                    <p className="text-muted-foreground">Use headers and short paragraphs</p>
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

export default CreateBlog;
