import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Shield,
  Edit,
  Instagram,
  Facebook,
  CheckCircle,
  XCircle,
  Tag,
} from 'lucide-react';
import { IUser } from '../(helper)';




const ProfileView = ({ user, onEditClick }: { user: IUser; onEditClick: () => void }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      creator: 'bg-gradient-to-r from-purple-500 to-pink-500',
      brand: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      admin: 'bg-gradient-to-r from-red-500 to-orange-500',
    };
    // @ts-ignore
    return roleConfig[role] || roleConfig.creator;
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Card */}
        <Card className="p-8 shadow-xl border-2 bg-gradient-to-br bg-card dark:bg-card">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Profile Picture */}
            <div className="relative group">
              <img
                src={user?.profile_pic || user?.profilePicture}
                alt={`${user?.firstName} ${user?.lastName}`}
                className="w-32 h-32 rounded-full object-cover border-4 border-border  shadow-2xl ring-4 ring-blue-900 group-hover:scale-105 transition-transform duration-300"
              />
              {user?.isVerified && (
                <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-2 shadow-lg border-2 border-border ">
                  <CheckCircle className="w-5 h-5 " />
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <p className="text-lg text-muted-foreground">@{user?.username}</p>
                </div>
                <Button
                  onClick={onEditClick}
                  className="bg-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  data-testid="edit-profile-button"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge className={`${getRoleBadge(user?.role)}  px-4 py-1.5 text-sm shadow-md`}>
                  <Shield className="w-3 h-3 mr-1" />
                  {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                </Badge>
                {user?.isVerified ? (
                  <Badge className="bg-green-500  px-4 py-1.5 shadow-md">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-2 border-border px-4 py-1.5">
                    <XCircle className="w-3 h-3 mr-1" />
                    Not Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-6 shadow-lg border-2 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Contact Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <Mail className="w-5 h-5 " />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground font-medium">Email</p>
                <p className="font-semibold truncate">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <Phone className="w-5 h-5 " />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground font-medium">Phone</p>
                <p className="font-semibold">{user?.phone}</p>
              </div>
            </div>
          </div>
        </Card>
            <Card className="p-6 shadow-lg border-2 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Company Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <Mail className="w-5 h-5 " />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground font-medium">Founder Name</p>
                <p className="font-semibold truncate">{user?.founderName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <Phone className="w-5 h-5 " />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground font-medium">GST Number</p>
                <p className="font-semibold">{user?.gstNumber}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <Phone className="w-5 h-5 " />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground font-medium">Pan Card</p>
                <p className="font-semibold">{user?.panCard}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Industry & Interests */}
        {user?.industry && user?.industry.length > 0 && (
          <Card className="p-6 shadow-lg border-2 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-purple-600" />
              Industries & Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {user?.industry.map((item, index) => (
                <Badge
                  key={index}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white  px-4 py-2 text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Social Media Connections */}
      

        {/* Account Details */}
        <Card className="p-6 shadow-lg border-2 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600" />
            Account Details
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-card rounded-xl border border-border">
              <p className="text-sm text-muted-foreground font-medium mb-1">Account Created</p>
              <p className="font-semibold">{formatDate(user?.createdAt?.toString() || '')}</p>
            </div>
            <div className="p-4 bg-card rounded-xl border border-border">
              <p className="text-sm text-muted-foreground font-medium mb-1">Last Updated</p>
              <p className="font-semibold">{formatDate(user?.updatedAt?.toString() || '')}</p>
            </div>
          
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileView;
