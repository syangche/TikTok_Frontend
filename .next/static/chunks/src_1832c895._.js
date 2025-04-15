(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_1832c895._.js", {

"[project]/src/services/userService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "followUser": (()=>followUser),
    "getUserById": (()=>getUserById),
    "getUserFollowers": (()=>getUserFollowers),
    "getUserFollowing": (()=>getUserFollowing),
    "getUserVideos": (()=>getUserVideos),
    "unfollowUser": (()=>unfollowUser),
    "updateUser": (()=>updateUser)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/axios.js [app-client] (ecmascript)");
;
const getUserById = async (userId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user ${userId}:`, error);
        throw error;
    }
};
const updateUser = async (userId, formData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/users/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating user ${userId}:`, error);
        throw error;
    }
};
const followUser = async (userId)=>{
    try {
        console.log(`Following user ${userId}`);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/users/${userId}/follow`);
        return response.data;
    } catch (error) {
        console.error(`Error following user ${userId}:`, error);
        throw error;
    }
};
const unfollowUser = async (userId)=>{
    try {
        console.log(`Unfollowing user ${userId}`);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/users/${userId}/follow`);
        return response.data;
    } catch (error) {
        console.error(`Error unfollowing user ${userId}:`, error);
        throw error;
    }
};
const getUserFollowers = async (userId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/users/${userId}/followers`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching followers for user ${userId}:`, error);
        throw error;
    }
};
const getUserFollowing = async (userId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/users/${userId}/following`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching following for user ${userId}:`, error);
        throw error;
    }
};
const getUserVideos = async (userId)=>{
    try {
        const id = typeof userId === 'object' ? userId.userId : userId;
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/users/${id}/videos`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching videos for user ${userId}:`, error);
        return {
            videos: []
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/services/videoService.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "addComment": (()=>addComment),
    "getFollowingVideos": (()=>getFollowingVideos),
    "getUserVideos": (()=>getUserVideos),
    "getVideoById": (()=>getVideoById),
    "getVideoComments": (()=>getVideoComments),
    "getVideos": (()=>getVideos),
    "likeVideo": (()=>likeVideo),
    "unlikeVideo": (()=>unlikeVideo)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/axios.js [app-client] (ecmascript)");
;
const getVideos = async ({ cursor, limit = 10 })=>{
    try {
        // Build query string with cursor if available
        let queryParams = `limit=${limit}`;
        if (cursor) {
            queryParams += `&cursor=${cursor}`;
        }
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/videos?${queryParams}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching videos:', error);
        throw error;
    }
};
const getFollowingVideos = async ({ cursor, limit = 10 })=>{
    try {
        let queryParams = `limit=${limit}`;
        if (cursor) {
            queryParams += `&cursor=${cursor}`;
        }
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/videos/following?${queryParams}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching following videos:', error);
        throw error;
    }
};
const getVideoById = async (id)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/videos/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching video ${id}:`, error);
        throw error;
    }
};
const getUserVideos = async ({ userId, cursor, limit = 10 })=>{
    try {
        let queryParams = `limit=${limit}`;
        if (cursor) {
            queryParams += `&cursor=${cursor}`;
        }
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/users/${userId}/videos?${queryParams}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching videos for user ${userId}:`, error);
        throw error;
    }
};
const getVideoComments = async (videoId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/videos/${videoId}/comments`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching comments for video ${videoId}:`, error);
        return {
            comments: []
        };
    }
};
const likeVideo = async (videoId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/videos/${videoId}/like`);
        return response.data;
    } catch (error) {
        console.error(`Error liking video ${videoId}:`, error);
        throw error;
    }
};
const unlikeVideo = async (videoId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/videos/${videoId}/like`);
        return response.data;
    } catch (error) {
        console.error(`Error unliking video ${videoId}:`, error);
        throw error;
    }
};
const addComment = async (videoId, content)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/comments', {
            videoId,
            content
        });
        return response.data;
    } catch (error) {
        console.error(`Error adding comment to video ${videoId}:`, error);
        throw error;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/profile/[userId]/page.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ProfilePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/userService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/videoService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$authContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/authContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function ProfilePage() {
    _s();
    const { userId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const { user: currentUser, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$authContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [followers, setFollowers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [following, setFollowing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isFollowing, setIsFollowing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('videos');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [videos, setVideos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Edit profile form state
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [bio, setBio] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [avatarFile, setAvatarFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [avatarPreview, setAvatarPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const avatarInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Function to refresh all profile data
    const refreshProfileData = async ()=>{
        try {
            // Fetch fresh user data
            const userData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserById"])(userId);
            setUser(userData);
            setName(userData.name || '');
            setBio(userData.bio || '');
            // Fetch fresh followers/following data
            if (isAuthenticated && currentUser) {
                const followersData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserFollowers"])(userId);
                setFollowers(followersData.followers || []);
                setIsFollowing(followersData.followers?.some((f)=>f.id === currentUser.id) || false);
            }
            const followingData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserFollowing"])(userId);
            setFollowing(followingData.following || []);
            // Fetch fresh videos - simplified call
            try {
                const videosData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserVideos"])(userId);
                setVideos(videosData.videos || []);
            } catch (error) {
                console.error('Error fetching videos:', error);
                setVideos([]);
            }
        } catch (error) {
            console.error('Error refreshing profile data:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Failed to refresh profile data');
        }
    };
    // Fetch user profile data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProfilePage.useEffect": ()=>{
            const fetchProfileData = {
                "ProfilePage.useEffect.fetchProfileData": async ()=>{
                    try {
                        setLoading(true);
                        // Fetch user data
                        let userData;
                        try {
                            userData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserById"])(userId);
                            setUser(userData);
                            setName(userData.name || '');
                            setBio(userData.bio || '');
                        } catch (error) {
                            console.error('Error fetching user data:', error);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Failed to load user data');
                            return; // Exit if we can't get basic user data
                        }
                        // Fetch followers/following data
                        if (isAuthenticated && currentUser) {
                            try {
                                const followersData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserFollowers"])(userId);
                                setFollowers(followersData.followers || []);
                                setIsFollowing(followersData.followers?.some({
                                    "ProfilePage.useEffect.fetchProfileData": (f)=>f.id === currentUser.id
                                }["ProfilePage.useEffect.fetchProfileData"]) || false);
                            } catch (error) {
                                console.error('Error fetching followers:', error);
                                setFollowers([]);
                            }
                        }
                        try {
                            const followingData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserFollowing"])(userId);
                            setFollowing(followingData.following || []);
                        } catch (error) {
                            console.error('Error fetching following:', error);
                            setFollowing([]);
                        }
                        // Fetch videos with better error handling
                        try {
                            const videosData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$videoService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserVideos"])(userId);
                            setVideos(videosData.videos || []);
                        } catch (error) {
                            console.error('Error fetching videos:', error);
                            setVideos([]);
                        }
                    } catch (error) {
                        console.error('Error in fetchProfileData:', error);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Failed to load profile data');
                    } finally{
                        setLoading(false);
                    }
                }
            }["ProfilePage.useEffect.fetchProfileData"];
            if (userId) {
                fetchProfileData();
            }
        }
    }["ProfilePage.useEffect"], [
        userId,
        isAuthenticated,
        currentUser
    ]);
    // Add an effect to refresh when userId changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProfilePage.useEffect": ()=>{
            if (userId && !loading) {
                refreshProfileData();
            }
        }
    }["ProfilePage.useEffect"], [
        userId
    ]);
    // Handle follow/unfollow
    const handleFollowToggle = async ()=>{
        if (!isAuthenticated) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Please log in to follow users');
            return;
        }
        try {
            if (isFollowing) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unfollowUser"])(userId);
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["followUser"])(userId);
            }
            // Refresh all profile data
            await refreshProfileData();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success(isFollowing ? 'Unfollowed user' : 'Following user');
        } catch (error) {
            console.error('Error toggling follow:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Failed to follow/unfollow user');
        }
    };
    // Handle avatar file selection
    const handleAvatarChange = (e)=>{
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Please select an image file');
            return;
        }
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };
    // Handle profile update submission
    const handleProfileUpdate = async (e)=>{
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('bio', bio);
            if (avatarFile) {
                formData.append('avatar', avatarFile);
            }
            const updatedUser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$userService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateUser"])(userId, formData);
            // Update the user state with the response from the server
            setUser(updatedUser);
            setIsEditing(false);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Profile updated successfully');
            // Refresh profile data to ensure everything is up to date
            await refreshProfileData();
        } catch (error) {
            console.error('Error updating profile:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Failed to update profile');
        }
    };
    // Helper function to get full URL for images/videos
    const getFullVideoUrl = (url)=>{
        if (!url) return null;
        if (url.startsWith('http')) return url;
        const baseUrl = ("TURBOPACK compile-time value", "http://localhost:8000/api") || 'http://localhost:8000/api';
        const serverUrl = baseUrl.includes('/api') ? baseUrl.substring(0, baseUrl.indexOf('/api')) : baseUrl;
        return `${serverUrl}${url}`;
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center py-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"
            }, void 0, false, {
                fileName: "[project]/src/app/profile/[userId]/page.jsx",
                lineNumber: 215,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/profile/[userId]/page.jsx",
            lineNumber: 214,
            columnNumber: 7
        }, this);
    }
    if (!user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "User not found"
            }, void 0, false, {
                fileName: "[project]/src/app/profile/[userId]/page.jsx",
                lineNumber: 223,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/profile/[userId]/page.jsx",
            lineNumber: 222,
            columnNumber: 7
        }, this);
    }
    const isOwnProfile = isAuthenticated && currentUser?.id === parseInt(userId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start mb-8",
                children: [
                    isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-24 w-24 rounded-full mr-6 overflow-hidden relative",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>avatarInputRef.current?.click(),
                            className: "cursor-pointer h-full w-full flex items-center justify-center bg-gray-200",
                            children: [
                                avatarPreview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: avatarPreview,
                                    alt: "Profile preview",
                                    className: "h-full w-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                    lineNumber: 241,
                                    columnNumber: 17
                                }, this) : user.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: getFullVideoUrl(user.avatar),
                                    alt: user.username,
                                    className: "h-full w-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                    lineNumber: 247,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaUpload"], {
                                    className: "text-gray-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                    lineNumber: 253,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "file",
                                    ref: avatarInputRef,
                                    onChange: handleAvatarChange,
                                    accept: "image/*",
                                    className: "hidden"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                    lineNumber: 255,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white text-sm font-medium",
                                        children: "Change"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                        lineNumber: 263,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                    lineNumber: 262,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/profile/[userId]/page.jsx",
                            lineNumber: 236,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/profile/[userId]/page.jsx",
                        lineNumber: 235,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-24 w-24 rounded-full mr-6 overflow-hidden bg-gray-200",
                        children: user.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: getFullVideoUrl(user.avatar),
                            alt: user.username,
                            className: "h-full w-full object-cover"
                        }, void 0, false, {
                            fileName: "[project]/src/app/profile/[userId]/page.jsx",
                            lineNumber: 270,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full w-full flex items-center justify-center bg-gray-200 text-gray-500",
                            children: user.username?.charAt(0)?.toUpperCase() || 'U'
                        }, void 0, false, {
                            fileName: "[project]/src/app/profile/[userId]/page.jsx",
                            lineNumber: 276,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/profile/[userId]/page.jsx",
                        lineNumber: 268,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl font-bold mb-2",
                                children: [
                                    "@",
                                    user.username
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                lineNumber: 284,
                                columnNumber: 11
                            }, this),
                            isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleProfileUpdate,
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium mb-1",
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                                lineNumber: 289,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: name,
                                                onChange: (e)=>setName(e.target.value),
                                                className: "w-full p-2 border border-gray-300 rounded"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                                lineNumber: 290,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                        lineNumber: 288,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium mb-1",
                                                children: "Bio"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                                lineNumber: 299,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: bio,
                                                onChange: (e)=>setBio(e.target.value),
                                                className: "w-full p-2 border border-gray-300 rounded",
                                                rows: "3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                                lineNumber: 300,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                        lineNumber: 298,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: "px-4 py-2 bg-blue-500 text-white rounded",
                                                children: "Save Changes"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                                lineNumber: 309,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setIsEditing(false),
                                                className: "px-4 py-2 border border-gray-300 rounded",
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                                lineNumber: 315,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                        lineNumber: 308,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                lineNumber: 287,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg mb-4",
                                        children: user.name || user.username
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                        lineNumber: 326,
                                        columnNumber: 15
                                    }, this),
                                    isOwnProfile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsEditing(true),
                                        className: "px-6 py-1.5 rounded-md border border-gray-300 font-medium flex items-center mr-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEdit"], {
                                                className: "mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                                lineNumber: 333,
                                                columnNumber: 19
                                            }, this),
                                            " Edit profile"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                        lineNumber: 329,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleFollowToggle,
                                        className: `px-6 py-1.5 rounded-md font-medium flex items-center mr-3 ${isFollowing ? 'border border-gray-300' : 'bg-blue-500 text-white'}`,
                                        children: isFollowing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaUserCheck"], {
                                                    className: "mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                                    lineNumber: 346,
                                                    columnNumber: 23
                                                }, this),
                                                " Following"
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaUserPlus"], {
                                                    className: "mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                                    lineNumber: 350,
                                                    columnNumber: 23
                                                }, this),
                                                " Follow"
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                        lineNumber: 336,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center mt-4 space-x-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: following.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                                        lineNumber: 357,
                                                        columnNumber: 20
                                                    }, this),
                                                    " Following"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                                lineNumber: 357,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: followers.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                                        lineNumber: 358,
                                                        columnNumber: 20
                                                    }, this),
                                                    " Followers"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                                lineNumber: 358,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: user.likeCount || 0
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                                        lineNumber: 359,
                                                        columnNumber: 20
                                                    }, this),
                                                    " Likes"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                                lineNumber: 359,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                        lineNumber: 356,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 text-sm max-w-md",
                                        children: user.bio || "No bio yet."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                        lineNumber: 362,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/[userId]/page.jsx",
                        lineNumber: 283,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/profile/[userId]/page.jsx",
                lineNumber: 233,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveTab('videos'),
                            className: `py-2 px-4 font-medium ${activeTab === 'videos' ? 'border-b-2 border-black' : 'text-gray-500'}`,
                            children: "Videos"
                        }, void 0, false, {
                            fileName: "[project]/src/app/profile/[userId]/page.jsx",
                            lineNumber: 373,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveTab('liked'),
                            className: `py-2 px-4 font-medium ${activeTab === 'liked' ? 'border-b-2 border-black' : 'text-gray-500'}`,
                            children: "Liked"
                        }, void 0, false, {
                            fileName: "[project]/src/app/profile/[userId]/page.jsx",
                            lineNumber: 381,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/profile/[userId]/page.jsx",
                    lineNumber: 372,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/profile/[userId]/page.jsx",
                lineNumber: 371,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-4",
                children: activeTab === 'videos' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-3 gap-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6",
                    children: videos.length > 0 ? videos.map((video)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/video/${video.id}`,
                            className: "aspect-[9/16] relative block",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: video.thumbnailUrl ? getFullVideoUrl(video.thumbnailUrl) : "https://via.placeholder.com/150",
                                    alt: video.caption,
                                    className: "h-full w-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                    lineNumber: 399,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute bottom-2 left-2 flex items-center text-white",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaRegHeart"], {
                                            className: "mr-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                            lineNumber: 405,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: video.likeCount || 0
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                            lineNumber: 406,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                    lineNumber: 404,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, video.id, true, {
                            fileName: "[project]/src/app/profile/[userId]/page.jsx",
                            lineNumber: 398,
                            columnNumber: 17
                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-6 py-20 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-md mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold mb-2",
                                    children: isOwnProfile ? "Upload your first video" : "No videos yet"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                    lineNumber: 413,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 mb-6",
                                    children: isOwnProfile ? "Your videos will appear here" : `${user.username} hasn't uploaded any videos yet`
                                }, void 0, false, {
                                    fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                    lineNumber: 416,
                                    columnNumber: 19
                                }, this),
                                isOwnProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/upload",
                                    className: "bg-blue-500 text-white px-8 py-2 rounded-md font-medium inline-block",
                                    children: "Upload now"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/profile/[userId]/page.jsx",
                                    lineNumber: 420,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/profile/[userId]/page.jsx",
                            lineNumber: 412,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/profile/[userId]/page.jsx",
                        lineNumber: 411,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/[userId]/page.jsx",
                    lineNumber: 395,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-20 text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500",
                        children: "Liked videos are private"
                    }, void 0, false, {
                        fileName: "[project]/src/app/profile/[userId]/page.jsx",
                        lineNumber: 430,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/profile/[userId]/page.jsx",
                    lineNumber: 429,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/profile/[userId]/page.jsx",
                lineNumber: 393,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/profile/[userId]/page.jsx",
        lineNumber: 231,
        columnNumber: 5
    }, this);
}
_s(ProfilePage, "4WCbX2nC98XMLiuFMmY1z2eC4uE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$authContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ProfilePage;
var _c;
__turbopack_context__.k.register(_c, "ProfilePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_1832c895._.js.map