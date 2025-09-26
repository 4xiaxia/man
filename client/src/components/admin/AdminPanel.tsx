import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  MessageSquare,
  BrainCircuit,
  ImageIcon,
  Search,
  Film,
  FileText,
  ExternalLink,
  Globe,
  Code
} from "lucide-react";
import { 
  KnowledgeBase, 
  getKnowledgeBases, 
  saveKnowledgeBases, 
  IconName 
} from "@/data/contentManager";
import { 
  LLMAgentTopic, 
  LLMAgentArticle, 
  getLLMAgentTopics, 
  saveLLMAgentTopics 
} from "../pages/LLMAgentPage";

// 图标映射
const iconOptions = {
  MessageSquare,
  BrainCircuit,
  ImageIcon,
  Search,
  Film,
  FileText,
};

// 知识库编辑表单
interface KnowledgeBaseFormProps {
  item: KnowledgeBase | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: KnowledgeBase) => void;
}

const KnowledgeBaseForm: React.FC<KnowledgeBaseFormProps> = ({ item, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = React.useState<Partial<KnowledgeBase>>({});

  React.useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        id: '',
        name: '',
        description: '',
        url: '',
        iconName: 'MessageSquare',
        order: 1,
        tag: undefined,
        iframeStrategy: 'embed',
        showOnHome: true,
        category: ''
      });
    }
  }, [item]);

  const handleSave = () => {
    if (!formData.name || !formData.url) return;
    
    const newItem: KnowledgeBase = {
      ...formData,
      id: formData.id || `kb_${Date.now()}`,
      icon: iconOptions[formData.iconName as IconName] || MessageSquare
    } as KnowledgeBase;
    
    onSave(newItem);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{item ? '编辑知识库' : '添加知识库'}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-4 p-1">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">名称 *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="知识库名称"
                />
              </div>
              <div>
                <Label htmlFor="category">分类</Label>
                <Input
                  id="category"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="分类名称"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">描述</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="知识库描述"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="url">URL *</Label>
              <Input
                id="url"
                value={formData.url || ''}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="icon">图标</Label>
                <Select
                  value={formData.iconName || 'MessageSquare'}
                  onValueChange={(value) => setFormData({ ...formData, iconName: value as IconName })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(iconOptions).map((iconName) => (
                      <SelectItem key={iconName} value={iconName}>
                        <div className="flex items-center gap-2">
                          {React.createElement(iconOptions[iconName as IconName], { className: "h-4 w-4" })}
                          {iconName}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="order">排序</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order || 1}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tag">标签</Label>
                <Select
                  value={formData.tag || 'none'}
                  onValueChange={(value) => setFormData({ ...formData, tag: value === 'none' ? undefined : value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">无标签</SelectItem>
                    <SelectItem value="推荐">推荐</SelectItem>
                    <SelectItem value="免费">免费</SelectItem>
                    <SelectItem value="热门">热门</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="strategy">显示策略</Label>
                <Select
                  value={formData.iframeStrategy || 'embed'}
                  onValueChange={(value) => setFormData({ ...formData, iframeStrategy: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="embed">内嵌显示</SelectItem>
                    <SelectItem value="snapshot">快照显示</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showOnHome"
                checked={formData.showOnHome || false}
                onChange={(e) => setFormData({ ...formData, showOnHome: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="showOnHome">在首页显示</Label>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={handleSave} disabled={!formData.name || !formData.url}>
            <Save className="h-4 w-4 mr-2" />
            保存
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// 专题编辑表单
interface TopicFormProps {
  topic: LLMAgentTopic | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (topic: LLMAgentTopic) => void;
}

const TopicForm: React.FC<TopicFormProps> = ({ topic, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = React.useState<Partial<LLMAgentTopic>>({});
  const [editingArticle, setEditingArticle] = React.useState<LLMAgentArticle | null>(null);

  React.useEffect(() => {
    if (topic) {
      setFormData(topic);
    } else {
      setFormData({
        id: '',
        name: '',
        category: '',
        order: 1,
        cardColor: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
        articles: []
      });
    }
  }, [topic]);

  const handleSave = () => {
    if (!formData.name || !formData.category) return;
    
    const newTopic: LLMAgentTopic = {
      ...formData,
      id: formData.id || `topic_${Date.now()}`,
      articles: formData.articles || []
    } as LLMAgentTopic;
    
    onSave(newTopic);
    onClose();
  };

  const handleAddArticle = () => {
    const newArticle: LLMAgentArticle = {
      id: `article_${Date.now()}`,
      title: '新文章',
      order: (formData.articles?.length || 0) + 1,
      contentType: 'richtext',
      content: '',
      description: ''
    };
    
    setFormData({
      ...formData,
      articles: [...(formData.articles || []), newArticle]
    });
    setEditingArticle(newArticle);
  };

  const handleEditArticle = (article: LLMAgentArticle) => {
    setEditingArticle(article);
  };

  const handleSaveArticle = (updatedArticle: LLMAgentArticle) => {
    const updatedArticles = formData.articles?.map(article =>
      article.id === updatedArticle.id ? updatedArticle : article
    ) || [];
    
    setFormData({ ...formData, articles: updatedArticles });
    setEditingArticle(null);
  };

  const handleDeleteArticle = (articleId: string) => {
    const updatedArticles = formData.articles?.filter(article => article.id !== articleId) || [];
    setFormData({ ...formData, articles: updatedArticles });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{topic ? '编辑专题' : '添加专题'}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-6">
            {/* 左侧：专题信息 */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="topicName">专题名称 *</Label>
                <Input
                  id="topicName"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="专题名称"
                />
              </div>

              <div>
                <Label htmlFor="topicCategory">分类名称 *</Label>
                <Input
                  id="topicCategory"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="ANP分类名称"
                />
              </div>

              <div>
                <Label htmlFor="topicOrder">排序</Label>
                <Input
                  id="topicOrder"
                  type="number"
                  value={formData.order || 1}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                />
              </div>

              <div>
                <Label htmlFor="cardColor">卡片颜色</Label>
                <Select
                  value={formData.cardColor || 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'}
                  onValueChange={(value) => setFormData({ ...formData, cardColor: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">蓝色</SelectItem>
                    <SelectItem value="bg-gradient-to-br from-green-50 to-green-100 border-green-200">绿色</SelectItem>
                    <SelectItem value="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">紫色</SelectItem>
                    <SelectItem value="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">橙色</SelectItem>
                    <SelectItem value="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">粉色</SelectItem>
                    <SelectItem value="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">靛蓝</SelectItem>
                    <SelectItem value="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">青色</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 右侧：文章列表 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>专题文章</Label>
                <Button size="sm" onClick={handleAddArticle}>
                  <Plus className="h-4 w-4 mr-1" />
                  添加文章
                </Button>
              </div>

              <ScrollArea className="h-80">
                <div className="space-y-2">
                  {formData.articles?.sort((a, b) => a.order - b.order).map((article) => (
                    <Card key={article.id} className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {article.contentType === "external" && <ExternalLink className="h-4 w-4" />}
                          {article.contentType === "iframe" && <Globe className="h-4 w-4" />}
                          {article.contentType === "richtext" && <FileText className="h-4 w-4" />}
                          {article.contentType === "api" && <Code className="h-4 w-4" />}
                          <div>
                            <p className="font-medium text-sm">{article.title}</p>
                            <p className="text-xs text-gray-500">排序: {article.order}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditArticle(article)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteArticle(article.id)}
                          >
                            <Trash2 className="h-3 w-3 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button onClick={handleSave} disabled={!formData.name || !formData.category}>
              <Save className="h-4 w-4 mr-2" />
              保存
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 文章编辑弹窗 */}
      {editingArticle && (
        <ArticleForm
          article={editingArticle}
          isOpen={!!editingArticle}
          onClose={() => setEditingArticle(null)}
          onSave={handleSaveArticle}
        />
      )}
    </>
  );
};

// 文章编辑表单
interface ArticleFormProps {
  article: LLMAgentArticle;
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: LLMAgentArticle) => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ article, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = React.useState<LLMAgentArticle>(article);

  React.useEffect(() => {
    setFormData(article);
  }, [article]);

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>编辑文章</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-4 p-1">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="articleTitle">标题 *</Label>
                <Input
                  id="articleTitle"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="文章标题"
                />
              </div>
              <div>
                <Label htmlFor="articleOrder">排序</Label>
                <Input
                  id="articleOrder"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="articleDescription">描述</Label>
              <Textarea
                id="articleDescription"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="文章描述"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="contentType">内容类型</Label>
              <Select
                value={formData.contentType}
                onValueChange={(value) => setFormData({ ...formData, contentType: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="external">外链跳转</SelectItem>
                  <SelectItem value="iframe">内嵌iframe</SelectItem>
                  <SelectItem value="richtext">富文本</SelectItem>
                  <SelectItem value="api">API接口</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="content">
                内容 {formData.contentType === 'external' || formData.contentType === 'iframe' ? '(URL)' : ''}
              </Label>
              {formData.contentType === 'richtext' ? (
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="输入富文本内容，支持 Markdown 格式"
                  rows={10}
                  className="font-mono text-sm"
                />
              ) : (
                <Input
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder={
                    formData.contentType === 'external' || formData.contentType === 'iframe'
                      ? "https://example.com"
                      : formData.contentType === 'api'
                      ? "API 端点 URL"
                      : "内容"
                  }
                />
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={handleSave} disabled={!formData.title || !formData.content}>
            <Save className="h-4 w-4 mr-2" />
            保存
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// 主管理面板组件
export const AdminPanel: React.FC = () => {
  const [knowledgeBases, setKnowledgeBases] = React.useState<KnowledgeBase[]>([]);
  const [topics, setTopics] = React.useState<LLMAgentTopic[]>([]);
  const [editingKB, setEditingKB] = React.useState<KnowledgeBase | null>(null);
  const [editingTopic, setEditingTopic] = React.useState<LLMAgentTopic | null>(null);
  const [isKBFormOpen, setIsKBFormOpen] = React.useState(false);
  const [isTopicFormOpen, setIsTopicFormOpen] = React.useState(false);

  React.useEffect(() => {
    setKnowledgeBases(getKnowledgeBases());
    setTopics(getLLMAgentTopics());
  }, []);

  // 知识库操作
  const handleAddKB = () => {
    setEditingKB(null);
    setIsKBFormOpen(true);
  };

  const handleEditKB = (item: KnowledgeBase) => {
    setEditingKB(item);
    setIsKBFormOpen(true);
  };

  const handleSaveKB = (item: KnowledgeBase) => {
    const updatedKBs = editingKB
      ? knowledgeBases.map(kb => kb.id === item.id ? item : kb)
      : [...knowledgeBases, item];
    
    setKnowledgeBases(updatedKBs);
    saveKnowledgeBases(updatedKBs);
  };

  const handleDeleteKB = (id: string) => {
    const updatedKBs = knowledgeBases.filter(kb => kb.id !== id);
    setKnowledgeBases(updatedKBs);
    saveKnowledgeBases(updatedKBs);
  };

  // 专题操作
  const handleAddTopic = () => {
    setEditingTopic(null);
    setIsTopicFormOpen(true);
  };

  const handleEditTopic = (topic: LLMAgentTopic) => {
    setEditingTopic(topic);
    setIsTopicFormOpen(true);
  };

  const handleSaveTopic = (topic: LLMAgentTopic) => {
    const updatedTopics = editingTopic
      ? topics.map(t => t.id === topic.id ? topic : t)
      : [...topics, topic];
    
    setTopics(updatedTopics);
    saveLLMAgentTopics(updatedTopics);
  };

  const handleDeleteTopic = (id: string) => {
    const updatedTopics = topics.filter(t => t.id !== id);
    setTopics(updatedTopics);
    saveLLMAgentTopics(updatedTopics);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 bg-gradient-to-r from-white/40 via-white/60 to-white/80 backdrop-blur-xl border border-white/30 rounded-xl shadow-lg mb-6">
        <h1 className="text-2xl font-bold text-gray-800">管理后台</h1>
        <p className="text-sm text-gray-600 mt-1">静态化本地编辑管理</p>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="knowledge" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="knowledge">知识库管理</TabsTrigger>
            <TabsTrigger value="topics">专题管理</TabsTrigger>
          </TabsList>
          
          <TabsContent value="knowledge" className="flex-1 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">知识库列表</h2>
                <Button onClick={handleAddKB}>
                  <Plus className="h-4 w-4 mr-2" />
                  添加知识库
                </Button>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {knowledgeBases
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((kb) => (
                      <Card key={kb.id} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {kb.icon && <kb.icon className="h-5 w-5" />}
                            <h3 className="font-semibold">{kb.name}</h3>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditKB(kb)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteKB(kb.id)}
                            >
                              <Trash2 className="h-3 w-3 text-red-500" />
                            </Button>
                          </div>
                        </div>
                        
                        {kb.tag && <Badge variant="secondary" className="mb-2">{kb.tag}</Badge>}
                        {kb.description && (
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {kb.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>排序: {kb.order}</span>
                          <span>{kb.category}</span>
                        </div>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value="topics" className="flex-1 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">专题列表</h2>
                <Button onClick={handleAddTopic}>
                  <Plus className="h-4 w-4 mr-2" />
                  添加专题
                </Button>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topics
                    .sort((a, b) => a.order - b.order)
                    .map((topic) => (
                      <Card key={topic.id} className={`p-4 ${topic.cardColor}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{topic.name}</h3>
                            <Badge variant="secondary" className="mt-1">{topic.category}</Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditTopic(topic)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteTopic(topic.id)}
                            >
                              <Trash2 className="h-3 w-3 text-red-500" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-2">
                          <p>文章数量: {topic.articles.length}</p>
                          <p>排序: {topic.order}</p>
                        </div>
                        
                        {topic.articles.length > 0 && (
                          <div className="text-xs text-gray-500">
                            <p>最新文章: {topic.articles[0]?.title}</p>
                          </div>
                        )}
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 表单弹窗 */}
      <KnowledgeBaseForm
        item={editingKB}
        isOpen={isKBFormOpen}
        onClose={() => {
          setIsKBFormOpen(false);
          setEditingKB(null);
        }}
        onSave={handleSaveKB}
      />

      <TopicForm
        topic={editingTopic}
        isOpen={isTopicFormOpen}
        onClose={() => {
          setIsTopicFormOpen(false);
          setEditingTopic(null);
        }}
        onSave={handleSaveTopic}
      />
    </div>
  );
};
