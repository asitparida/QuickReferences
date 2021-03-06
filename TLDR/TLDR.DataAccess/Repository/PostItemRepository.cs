﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TLDR.Common.Resources;
using TLDR.DataAccess.DataSource;
using TLDR.Models;
using TLDR.Models.Helpers;

namespace TLDR.DataAccess.Repository
{
    public class PostItemRepository : IPostItemRepository
    {
        private DocumentDbDataSource _db;
        private string dbName;
        private string collectionName;

        public PostItemRepository()
        {
            var config = AppConfig.Instance;
            _db = new DocumentDbDataSource(config.DocDbEndpointUri, config.DocDbPrimaryKey);
            dbName = config.DocDbDatabaseName;
            collectionName = config.DocDbCollectionNameForPosts;

            ValidateDbAndCollectionExists(dbName, collectionName);
        }

        private async void ValidateDbAndCollectionExists(string db, string collection)
        {
            await _db.CreateDatabaseIfNotExists(db);
            await _db.CreateDocumentCollectionIfNotExists(dbName, collection);
        }

        public async Task<Guid> AddPost(PostItem item, AuthorMapForPost author)
        {
            item.PostId = Guid.NewGuid();
            item.Upvotes = 0;
            item.Views = 0;
            item.CreatedOn = DateTime.UtcNow;
            item.ModifiedOn = DateTime.UtcNow;
            item.Author = author;
            item.IsPublished = true;
            await _db.CreateDocumentAsync<PostItem>(dbName, collectionName, item);
            return item.PostId;
        }

        public IEnumerable<PostItemResponse> GetAllPosts()
        {
            var items = _db.GetDocuments<PostItemResponse>(dbName, collectionName);
            return items;
        }

        public IEnumerable<Guid> GetAllPostByAuthor(string author)
        {
            string query = $"select * from {collectionName} p where p.Author.Alias = '{author}'";
            return _db.ExecuteQuery<PostItemResponse>(dbName, collectionName, query).Select(x => x.id);
        }

        public IEnumerable<Guid> GetAllPostByCategory(string category)
        {
            string query = $"select * from {collectionName} p where p.Category = {(int)Utils.GetEnumIntValue<Category>(category)}";
            return _db.ExecuteQuery<PostItemResponse>(dbName, collectionName, query).Select(x => x.id);
        }

        public IEnumerable<Guid> GetAllPostByTag(string tag)
        {
            string query = $"select * from {collectionName} p where Array_Contains(p.Tags,{tag})";
            return _db.ExecuteQuery<PostItemResponse>(dbName, collectionName, query).Select(x => x.id);
        }

        public IEnumerable<Guid> GetAllPostByTitleText(string titletext)
        {
            string query = $"select * from {collectionName} p where Contains(Lower(p.Title),'{titletext.ToLower()}')";
            return _db.ExecuteQuery<PostItemResponse>(dbName, collectionName, query).Select(x => x.id);
        }

        public async Task<PostItemResponse> FindPostById(Guid id)
        {
            var item = _db.GetDocumentById<PostItemResponse>(dbName, collectionName, id);
            if (item != null)
            {
                item.Views++;
                await _db.UpdateDocumentByIdAsync(dbName, collectionName, id, item);
            }
            return item;
        }

        public async Task<Guid> UpdatePost(PostItemResponse item)
        {
            var oldId = item.PostId;
            item.ModifiedOn = DateTime.UtcNow;
            item.PostId = Guid.NewGuid();
            var result = await _db.UpdateDocumentByIdAsync<PostItemResponse>(dbName, collectionName, item.id, item);
            if (result)
                return item.PostId;

            return Guid.Empty;
        }
        public async Task<bool> DeletePostById(Guid id)
        {
            return await _db.DeleteDocumentByIdAsync<PostItemResponse>(dbName, collectionName, id);
        }

        public IEnumerable<PostItemBrief> GetAllPostBriefs()
        {
            var items = _db.GetDocuments<PostItemBrief>(dbName, collectionName);
            return items;
        }

        public IEnumerable<Guid> GetAllPostIDs(int pageLength, int pageIndex, string sortBy)
        {
            var items = _db.GetDocuments<PostItemBrief>(dbName, collectionName, pageLength, pageIndex, sortBy);
            return items
                .Select(x => x.id);
        }
    }
}
