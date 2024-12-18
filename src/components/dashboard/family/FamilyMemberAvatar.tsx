interface FamilyMemberAvatarProps {
  avatarUrl?: string | null;
  name: string;
  email: string;
  children?: React.ReactNode;
}

export const FamilyMemberAvatar = ({ avatarUrl, name, email, children }: FamilyMemberAvatarProps) => {
  return (
    <div className="group relative">
      <div
        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
        style={{
          backgroundColor: avatarUrl ? 'transparent' : `hsl(${Math.random() * 360}, 70%, 80%)`,
        }}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name || email}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-white font-medium">
            {(name || email || '').charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};