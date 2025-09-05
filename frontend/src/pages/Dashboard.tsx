// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import Header from '@/components/Header';
// import LoadingSpinner from '@/components/LoadingSpinner';
// import { Plus, Edit3, Trash2, Eye, Calendar } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import axios from 'axios';
// import { api } from '@/utils/api';

// interface Blog {
//   id: string;
//   title: string;
//   content: string;
//   authorName: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const Dashboard = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const { user, isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }
//     loadBlogs();
//   }, [isAuthenticated]);

//   const loadBlogs = async () => {
//     setIsLoading(true);
//     try {
//       const res = await api.get('/blogs'); // api interceptor adds token automatically

//       const data = res.data.content || [];
//       const mappedBlogs = data.map((b: any) => ({
//         id: b.id,
//         title: b.title,
//         content: b.content,
//         authorName: b.authorName || user?.name,
//         createdAt: b.createdAt,
//         updatedAt: b.updatedAt || b.createdAt,
//       }));

//       setBlogs(mappedBlogs);
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.response?.data?.message || "Failed to load blogs. Try again.",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (blogId: string) => {
//     try {
//       await api.delete(`/blogs/${blogId}`); // token already handled by interceptor

//       setBlogs(prev => prev.filter(blog => blog.id !== blogId));
//       toast({
//         title: "Blog deleted",
//         description: "Your blog post has been successfully deleted.",
//       });
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.response?.data?.message || "Failed to delete blog. Try again.",
//         variant: "destructive"
//       });
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   if (isLoading) return <LoadingSpinner />;


//   return (
//     <div className="min-h-screen bg-gradient-subtle">
//       <Header />
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-6xl mx-auto">
//           {/* Header Section */}
//           <div className="flex justify-between items-center mb-8 fade-in">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold mb-2">
//                 Welcome back, {user?.name}!
//               </h1>
//               <p className="text-muted-foreground">
//                 Manage your blog posts and continue sharing your stories
//               </p>
//             </div>
//             <Button className="btn-primary" asChild>
//               <Link to="/create">
//                 <Plus className="mr-2 h-4 w-4" />
//                 New Post
//               </Link>
//             </Button>
//           </div>

//           {/* Blog Posts */}
//           <div className="space-y-6">
//             <h2 className="text-2xl font-semibold">Your Posts</h2>
            
//             {blogs.length === 0 ? (
//               <Card className="card-hover">
//                 <CardContent className="p-12 text-center">
//                   <Edit3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
//                   <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
//                   <p className="text-muted-foreground mb-6">
//                     Start sharing your thoughts and ideas with the world
//                   </p>
//                   <Button className="btn-primary" asChild>
//                     <Link to="/create">Write Your First Post</Link>
//                   </Button>
//                 </CardContent>
//               </Card>
//             ) : (
//               <div className="grid gap-6">
//                 {blogs.map((blog, index) => (
//                   <Card key={blog.id} className={`card-hover fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
//                     <CardHeader>
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <CardTitle className="text-xl mb-2 hover:text-primary transition-colors">
//                             <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
//                           </CardTitle>
//                           <p className="text-muted-foreground mb-3">{blog.content.slice(0, 100)}{blog.content.length > 100 ? '...' : ''}</p>
//                           <div className="flex items-center text-sm text-muted-foreground">
//                             <Calendar className="h-4 w-4 mr-1" />
//                             Created {formatDate(blog.createdAt)}
//                             {blog.updatedAt !== blog.createdAt && (
//                               <span className="ml-2">• Updated {formatDate(blog.updatedAt)}</span>
//                             )}
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-2 ml-4">
//                           <Button variant="ghost" size="sm" asChild>
//                             <Link to={`/blog/${blog.id}`}>
//                               <Eye className="h-4 w-4" />
//                             </Link>
//                           </Button>
//                           <Button variant="ghost" size="sm" asChild>
//                             <Link to={`/edit/${blog.id}`}>
//                               <Edit3 className="h-4 w-4" />
//                             </Link>
//                           </Button>
//                           <Button 
//                             variant="ghost" 
//                             size="sm"
//                             onClick={() => handleDelete(blog.id)}
//                             className="text-destructive hover:text-destructive"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     </CardHeader>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Plus, Edit3, Trash2, Eye, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/utils/api';

interface Blog {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

const Dashboard = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadBlogs();
  }, [isAuthenticated]);

  const loadBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/blogs'); // api interceptor adds token automatically

      const data = res.data.content || [];
      const mappedBlogs = data.map((b: any) => ({
        id: b.id,
        title: b.title,
        content: b.content,
        authorName: b.authorName || 'Unknown',
        createdAt: b.createdAt,
        updatedAt: b.updatedAt || b.createdAt,
      }));

      setBlogs(mappedBlogs);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to load blogs. Try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (blogId: string) => {
    try {
      await api.delete(`/blogs/${blogId}`); // token already handled by interceptor

      setBlogs(prev => prev.filter(blog => blog.id !== blogId));
      toast({
        title: "Blog deleted",
        description: "Your blog post has been successfully deleted.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete blog. Try again.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8 fade-in">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-muted-foreground">
                Browse all posts and manage your own
              </p>
            </div>
            <Button className="btn-primary" asChild>
              <Link to="/create">
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Link>
            </Button>
          </div>

          {/* Blog Posts */}
          <div className="grid gap-6">
            {blogs.length === 0 && (
              <Card className="card-hover">
                <CardContent className="p-12 text-center">
                  <Edit3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start sharing your thoughts and ideas with the world
                  </p>
                  <Button className="btn-primary" asChild>
                    <Link to="/create">Write Your First Post</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {blogs.map((blog, index) => (
              <Card key={blog.id} className={`card-hover fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <CardTitle className="text-xl hover:text-primary transition-colors">
                          <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                        </CardTitle>
                        {blog.authorName === user?.name && (
                          <Badge variant="secondary">Your Post</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-3">{blog.content.slice(0, 100)}{blog.content.length > 100 ? '...' : ''}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        Created {formatDate(blog.createdAt)}
                        {blog.updatedAt !== blog.createdAt && (
                          <span className="ml-2">• Updated {formatDate(blog.updatedAt)}</span>
                        )}
                      </div>
                    </div>

                    {/* Edit/Delete only for your posts */}
                    {blog.authorName === user?.name && (
                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/blog/${blog.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/edit/${blog.id}`}>
                            <Edit3 className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(blog.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
